import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Header = () => {
  const [value, setValue] = useState();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  console.log(isLoggedIn);
  console.log(value);
  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(231,88,12,1) 0%, rgba(236,81,4,1) 36%, rgba(233,179,29,1) 100%)",
      }}
    >
      <Toolbar>
        <Typography variant="h4">Blog App</Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft="auto" marginRight="auto">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
              <Tab LinkComponent={Link} to="/myBlogs" label="My Blog" />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <Button
              LinkComponent={Link}
              to="/login"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="success"
            >
              Login
            </Button>
          )}
          {!isLoggedIn && (
            <Button
              LinkComponent={Link}
              to="/login"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="success"
            >
              SignUp
            </Button>
          )}

          {isLoggedIn && (
            <Button
              LinkComponent={Link}
              to="/login"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="success"
            >
              LogOut
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
