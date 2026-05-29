import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export const initialInvoiceData = {
  title: "Create Invoice",
  billing: { name: "", phone: "", address: "", email: "" },
  shipping: { name: "", phone: "", address: "" },
  invoice: { number: "", date: "", dueDate: "" },
  account: { name: "", number: "", ifsccode: "" },
  company: { name: "", phone: "", address: "", email: "", gst: "" },
  tax: 0,
  notes: "",
  items: [{ name: "", qty: "", amount: "", description: "", total: 0 }],
  logo: "",
  status: "Draft",
  themeColor: "#0d6efd",
  paymentLink: "",

  // Premium Features Placeholders
  currency: "INR",
  exchangeRate: 1.0,
  language: "EN",
  isRecurring: false,
  recurringInterval: "MONTHLY",
  recurrenceStatus: "ACTIVE",
};

export const AppContextProvider = (props) => {
  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
  const [invoiceTitle, setInvoiceTitle] = useState("Create Invoice");
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [userProfile, setUserProfile] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({ INR: 1.0 });

  const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

  // Fetch live exchange rates on app start
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get("https://open.er-api.com/v6/latest/INR");
        if (res.data && res.data.rates) {
          setExchangeRates(res.data.rates);
        }
      } catch (err) {
        console.error("Failed to fetch live exchange rates", err);
      }
    };
    fetchRates();
  }, []);

  // Convert amount between currencies using loaded exchange rates
  const convertCurrency = (amount, fromCurrency = "INR", toCurrency = "INR") => {
    if (!amount) return 0;
    if (fromCurrency === toCurrency) return amount;
    
    // We base everything off INR from the API response
    // amount * (1 / rates[fromCurrency]) * rates[toCurrency]
    const rateFrom = exchangeRates[fromCurrency];
    const rateTo = exchangeRates[toCurrency];

    if (!rateFrom || !rateTo) return amount; // Fallback
    return (amount / rateFrom) * rateTo;
  };

  const getNewInvoice = () => {
    const freshInvoice = JSON.parse(JSON.stringify(initialInvoiceData));
    if (userProfile) {
      freshInvoice.company = {
        name: userProfile.companyName || "",
        phone: userProfile.companyPhone || "",
        address: userProfile.companyAddress || "",
        email: userProfile.companyEmail || "",
        gst: userProfile.companyGst || "",
      };
      freshInvoice.currency = userProfile.homeCurrency || "INR";
      // Fetch dynamic exchange rate if currency is not homeCurrency
      const rate = convertCurrency(1.0, freshInvoice.currency, userProfile.homeCurrency || "INR");
      freshInvoice.exchangeRate = rate || 1.0;
    }
    return freshInvoice;
  };

  const contextValue = {
    baseURL,
    invoiceData,
    setInvoiceData,
    invoiceTitle,
    setInvoiceTitle,
    selectedTemplate,
    setSelectedTemplate,
    initialInvoiceData,
    userProfile,
    setUserProfile,
    getNewInvoice,
    exchangeRates,
    convertCurrency,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
