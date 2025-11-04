"use client"
import Image from "next/image";
import Link from "next/link";
import { Box, Paper, Typography, Button, Link as Link1 } from "@mui/material";
import { LaptopMinimal, Tv, Tv2 } from "lucide-react";
import logo from "../../public/logo/imgbin_aaa796b12d7b8f93a079b0627308926a.png"
import logo2 from "../../public/logo/imgbin_dc6459252a7a4081f1d9156e3f072feb.png"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1f3d] p-4">
      {/* Container for image + paper */}
      <div className="relative w-[100%] max-w-[700px]">
        {/* Logo positioned above the paper */}
        <Box
          sx={{
            position: "absolute",
            top: -60, // Adjust this to control how much it overlaps
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
          }}
        >
          <Image
            src={logo} 
            alt="Crazy 8's Logo"
            width={180} 
            height={120}
          />
        </Box>

        {/* Main Paper Component */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            pt: 8, // Extra padding at top to make room for the logo
            width: "100%",
            textAlign: "center",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1e2d4d",
          }}
        >
          <Typography
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{
              fontWeight: "normal",
              mt: 9,
              color: "white",
              fontFamily: "P5Hatty, sans-serif",
            }}
          >
           Welcome to Crazy 8&apos;s
          </Typography>
          <Typography
            variant="body1" 
            gutterBottom 
            sx={{
              fontWeight: "normal",
              mb: 2,
              color: "white",
              fontFamily: "P5Hatty, sans-serif",
              fontSize: 20
            }}
          >
            Start Playing
          </Typography>
          <Button 
            variant="outlined"
            href="/game"
            sx={{
              mb: 3,
              width: 300,
              height: 60,
              fontFamily: 'P5Hatty, sans-serif',
              color: "white",
              borderColor: "rgba(255, 255, 255, 0.3)",
              "&:hover": {
                borderColor: "white",
              }
            }}
          >
            <div className="flex flex-row gap-2">
              <div>
                <Tv2 />
              </div>
              <div>
                Play with Computer
              </div>
            </div>
          </Button>
          <Link1 
            href="/create-player" 
            sx={{
              color: "white",
              textDecoration: "underline",
              fontFamily: "P5Hatty, sans-serif",
              fontSize: 20
            }}
          >
            Profile settings
          </Link1>
          <Link1 
            href="/create-player" 
            sx={{
              color: "white",
              textDecoration: "underline",
              fontFamily: "P5Hatty, sans-serif",
              fontSize: 20
            }}
          >
            Rules of the game
          </Link1>
        </Paper>
      </div>
    </div>
  );
}