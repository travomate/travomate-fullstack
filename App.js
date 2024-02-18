import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Navigation from "./src/Navigations/Navigation";
import { ThemeContext } from "./contexts/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginProvider from "./srcAuth/context/LoginProvider";
import { DataProvider } from "./contexts/DataContext";


const client = new QueryClient();

export default function App() {
  const [theme, setTheme] = useState({ mode: "light" });

  const updateTheme = (newTheme) => {
    let mode;
    if (!newTheme) {
      mode = theme.mode === "dark" ? "light" : "dark";
      newTheme = { mode };
    }
    setTheme(newTheme);
  };

  return (
   <DataProvider>
     <QueryClientProvider client={client}>
      <LoginProvider>
        <ThemeContext.Provider value={{ theme, updateTheme }}>
          <Navigation />
          <StatusBar style={theme.mode == "dark" ? "light" : "dark"} />
        </ThemeContext.Provider>
      </LoginProvider>
    </QueryClientProvider>
   </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
