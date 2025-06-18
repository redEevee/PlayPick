export const mfConfig = {
  name: "main_container",
  remotes: {
    LandingPageApp: "LandingPageApp@http://localhost:3001/remoteEntry.js",
    NavigationBar: "NavigationBar@http://localhost:3002/remoteEntry.js",
    VersusGame: "VersusGame@http://localhost:3004/remoteEntry.js",
    PersonQuizGame: "PersonQuizGame@http://localhost:3003/remoteEntry.js",
    choicesOfASpringDay: "choicesOfASpringDay@http://localhost:3006/remoteEntry.js",
    spotTheDifference: "spotTheDifference@http://localhost:3005/remoteEntry.js",
    AuthenticationApp: "AuthenticationApp@http://localhost:3010/remoteEntry.js",
    // javascriptTestApp: "javascriptTestApp@http://localhost:3002/remoteEntry.js",
    // kakaoAuthenticationApp: "kakaoAuthenticationApp@http://localhost:3003/remoteEntry.js",
    // vuetifyTailwindBoardApp: "vuetifyTailwindBoardApp@http://localhost:3004/remoteEntry.js",
    // navigationBarApp: "navigationBarApp@http://localhost:3005/remoteEntry.js",
    // reactTestApp: "reactTestApp@http://localhost:3006/remoteEntry.js"
  },
   shared: {
    react: { singleton: true, requiredVersion: "^18.2.0" },
    "react-dom": { singleton: true, requiredVersion: "^18.2.0" },
    "@mui/material": { singleton: true, requiredVersion: "^7.0.1" },
    "@mui/icons-material": { singleton: true, requiredVersion: "^7.0.1" },
    "react-router-dom": { singleton: true, requiredVersion: "^6.30.0" },
  },
};
