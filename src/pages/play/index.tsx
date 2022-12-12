import React from "react";
import { useSelector } from "react-redux";
import { Box, Card, CardContent, Container } from "@mui/material";
import { Unity, useUnityContext } from "react-unity-webgl";
import { MainLayout } from "components/main-layout";
import { Escrow } from "components/escrow";
import { RootState } from "store";
import Loader from "components/loader";
import "./styles.css";

const unityConfig = {
  loaderUrl: "Build/1.loader.js",
  dataUrl: "Build/1.data",
  frameworkUrl: "Build/1.framework.js",
  codeUrl: "Build/1.wasm",
};

const Play = () => {
  const { loading } = useSelector((state: RootState) => state.play);
  const unityContext = useUnityContext(unityConfig);
  const { loadingProgression, isLoaded } = unityContext;

  return (
    <MainLayout>
      {loading && <Loader />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Card>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                minHeight: "540px",
                position: "relative",
              }}
            >
              <Unity
                unityProvider={unityContext.unityProvider}
                style={{
                  height: 540,
                  width: 950,
                  background: "#555",
                }}
              />
              {!isLoaded && loadingProgression > 0 && (
                <div className="unity-loader">
                  <div>Loading... {Math.round(loadingProgression * 100)}%</div>
                </div>
              )}
            </CardContent>
          </Card>
          <Card sx={{ mt: 3 }}>
            <Escrow unityContext={unityContext}></Escrow>
          </Card>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default Play;
