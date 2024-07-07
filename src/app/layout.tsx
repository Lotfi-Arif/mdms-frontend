import { Inter } from "next/font/google";
import { Providers } from "./providers";
import NavBar from "./components/NavBar";
import { Box, Container, CssBaseline } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Master Dissertation Management System",
  description: "Manage your dissertation process efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <NavBar />
            <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
              {children}
            </Container>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
