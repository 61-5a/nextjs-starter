"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import styles from "./index.module.css";

export default function LoginPage() {
  const [isLoginFetching, setIsLoginFetching] = useState(false);
  const [isRegisterFetching, setIsRegisterFetching] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: "",
  });
  const [registerFormData, setRegisterFormData] = useState({
    role: "",
    stockist_name: "",
    owner_mobile_no: "",
    ref_code: "",
    owner_name: "",
    owners_address: "",
    address: "",
    pharmacy_name: "",
    exact_location: "",
    retailer_type: "",
    licensce1: "",
    licensce2: "",
    licensce3: "",
    gst: "",
    state: "",
    district: "",
    user_name: "",
    email: "",
    contact_no: "",
    password_one: "",
    password_two: "",
  });
  const [registerErrors, setRegisterErrors] = useState({
    stockist_name: "",
    owner_mobile_no: "",
    owner_name: "",
    owners_address: "",
    address: "",
    pharmacy_name: "",
    exact_location: "",
    retailer_type: "",
    state: "",
    district: "",
    user_name: "",
    email: "",
    contact_no: "",
    password: "",
  });
  const [showROnePassword, setShowROnePassword] = useState(false);
  const [showRTwoPassword, setShowRTwoPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });

    const newErrors: { email: string; password: string } = {
      email: "",
      password: "",
    };

    if (name === "email") {
      if (!value) {
        newErrors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = "Email address is invalid.";
      }
    }

    if (name === "password") {
      if (!value) {
        newErrors.password = "Password is required.";
      } else if (value.length < 8) {
        newErrors.password = "Password must be at least 8 characters.";
      }
    }

    setLoginErrors({
      ...loginErrors,
      [name]: newErrors[name as keyof typeof newErrors],
    });
  };

  const handleRegisterChange = (event: any) => {
    const { name, value } = event.target;

    setRegisterFormData({
      ...registerFormData,
      [name]: value,
    });

    const newErrors = {
      stockist_name: "",
      owner_mobile_no: "",
      owner_name: "",
      owners_address: "",
      address: "",
      pharmacy_name: "",
      exact_location: "",
      retailer_type: "",
      state: "",
      district: "",
      user_name: "",
      email: "",
      contact_no: "",
    };

    if (!value) {
      newErrors[name as keyof typeof newErrors] = `${name.replace(/_/g, " ")} is required.`;
    }

    if (name === "email" && value) {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(value)) {
        newErrors.email = "Invalid email address.";
      }
    }

    if (name === "contact_no" && value) {
      const contactRegex = /^[6-9]\d{9}$/;
      if (!contactRegex.test(value)) {
        newErrors.contact_no = "Invalid contact number. It should be a 10-digit Indian mobile number.";
      }
    }

    setRegisterErrors({
      ...registerErrors,
      [name]: newErrors[name as keyof typeof newErrors],
    });
  };

  const handleRegisterPasswordChange = (event: any) => {
    const { name, value } = event.target;

    setRegisterFormData({
      ...registerFormData,
      [name]: value,
    });

    let newErrors = {
      password: "",
    };

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (name === "password_one") {
      if (!passwordRegex.test(value)) {
        newErrors.password =
          "Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character.";
      } else if (registerFormData.password_two && value !== registerFormData.password_two) {
        newErrors.password = "Passwords do not match.";
      }
    }

    if (name === "password_two") {
      if (registerFormData.password_one && registerFormData.password_one !== value) {
        newErrors.password = "Passwords do not match.";
      } else if (!passwordRegex.test(registerFormData.password_one)) {
        newErrors.password =
          "Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character.";
      }
    }

    setRegisterErrors({
      ...registerErrors,
      password: newErrors.password,
    });
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };
  // Toggle password visibility
  const toggleROnePasswordVisibility = () => {
    setShowROnePassword(!showROnePassword);
  };

  const toggleRTwoPasswordVisibility = () => {
    setShowRTwoPassword(!showRTwoPassword);
  };

  const toggleLoginPasswordVisibility = () => {
    setShowLoginPassword(!showLoginPassword);
  };

  const commonParams = {
    role: registerFormData.role,
    username: registerFormData.user_name,
    email: registerFormData.email,
    contact_no: registerFormData.contact_no,
    password: registerFormData.password_one,
  };

  const roleSpecificParams: { [key: string]: object } = {
    employee: {},
    retailer: {
      pharmacy_name: registerFormData.pharmacy_name,
      retailer_type: registerFormData.retailer_type,
      licensce1: registerFormData.licensce1,
      licensce2: registerFormData.licensce2,
      licensce3: registerFormData.licensce3,
      gst: registerFormData.gst,
      exact_location: registerFormData.exact_location,
      district: registerFormData.district,
      state: registerFormData.state,
    },
    stockist: {
      stockist_name: registerFormData.stockist_name,
      address: registerFormData.address,
      ref_code: registerFormData.ref_code,
      owner_name: registerFormData.owner_name,
      owners_address: registerFormData.owners_address,
      owner_mobile_no: registerFormData.owner_mobile_no,
      district: registerFormData.district,
      state: registerFormData.state,
    },
  };

  const registerParamas = {
    ...commonParams,
    ...roleSpecificParams[registerFormData.role],
  };

  console.log({ registerParamas });
  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/login`;
    console.log({ url });

    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${yourAuthToken}`,
      },
      body: JSON.stringify({
        email: loginFormData.email,
        password: loginFormData.password,
      }),
      next: { revalidate: false },
    };

    try {
      const resp = await fetch(url, options);

      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }

      const data = await resp.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["login"],
    queryFn: fetchData,
    enabled: isLoginFetching,
  });

  const handleButtonClick = () => {
    setIsLoginFetching(true);
  };

  console.log({ loginFormData });
  return (
    <>
      <div className="py-16">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
            }}
          ></div>

          <div className="w-full p-8 lg:w-1/2">
            <div className="flex items-center justify-center ">
              <Image src="/img/icon/pharmacy logo.png" alt="logo" width={150} height={150} />
            </div>
            {isSignUp ? (
              <>
                <p className="text-xl text-gray-600 text-center">Signup with us!</p>

                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Select Your Role</label>
                  <select
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    name="role"
                    value={registerFormData.role}
                    onChange={handleRegisterChange}
                  >
                    <option value="" disabled>
                      Select Your Role
                    </option>
                    <option value="retailer">Retailer</option>
                    <option value="stockist">Stockist</option>
                    <option value="employee"> I want a Job</option>
                  </select>
                </div>
                {registerFormData.role === "retailer" && (
                  <>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Pharmacy Name *</label>
                      <input
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="text"
                        name="pharmacy_name"
                        value={registerFormData.pharmacy_name}
                        onChange={handleRegisterChange}
                      />
                      {registerErrors.pharmacy_name && (
                        <p className="text-red-500 text-xs mt-1">{registerErrors.pharmacy_name}</p>
                      )}
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Retailer Type *</label>
                      <select
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        name="retailer_type"
                        value={registerFormData.retailer_type}
                        onChange={handleRegisterChange}
                      >
                        <option value="hospital_pharmacy">Hospital Pharmacy</option>
                        <option value="medical_store">Medical Store</option>
                        <option value="chain_pharmacy">Chain Pharmacy</option>
                        <option value="fmcg">FMCG</option>
                        <option value="others">Others</option>
                      </select>
                      {registerErrors.retailer_type && (
                        <p className="text-red-500 text-xs mt-1">{registerErrors.retailer_type}</p>
                      )}
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">DL No:</label>
                      <input
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="text"
                        name="licensce1"
                        value={registerFormData.licensce1}
                        onChange={handleRegisterChange}
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">DL No:</label>
                      <input
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="text"
                        name="licensce2"
                        value={registerFormData.licensce2}
                        onChange={handleRegisterChange}
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">DL No:</label>
                      <input
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="text"
                        name="licensce3"
                        value={registerFormData.licensce3}
                        onChange={handleRegisterChange}
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">GST No:</label>
                      <input
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="text"
                        name="gst"
                        value={registerFormData.gst}
                        onChange={handleRegisterChange}
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Exact Location/Landmark *</label>
                      <input
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="text"
                        name="exact_location"
                        value={registerFormData.exact_location}
                        onChange={handleRegisterChange}
                      />
                      {registerErrors.exact_location && (
                        <p className="text-red-500 text-xs mt-1">{registerErrors.exact_location}</p>
                      )}
                    </div>
                  </>
                )}

                {registerFormData.role === "stockist" && (
                  <>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Stockist Name *</label>
                      <input
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="text"
                        name="stockist_name"
                        value={registerFormData.stockist_name}
                        onChange={handleRegisterChange}
                      />
                      {registerErrors.stockist_name && (
                        <p className="text-red-500 text-xs mt-1">{registerErrors.stockist_name}</p>
                      )}
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Address *</label>
                      <input
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="text"
                        name="address"
                        value={registerFormData.address}
                        onChange={handleRegisterChange}
                      />
                      {registerErrors.address && <p className="text-red-500 text-xs mt-1">{registerErrors.address}</p>}
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Ref Code:</label>
                      <input
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="text"
                        name="ref_code"
                        value={registerFormData.ref_code}
                        onChange={handleRegisterChange}
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Owner Name *</label>
                      <input
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="text"
                        name="owner_name"
                        value={registerFormData.owner_name}
                        onChange={handleRegisterChange}
                      />
                      {registerErrors.owner_name && (
                        <p className="text-red-500 text-xs mt-1">{registerErrors.owner_name}</p>
                      )}
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Owners Address *</label>
                      <input
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="text"
                        name="owners_address"
                        value={registerFormData.owners_address}
                        onChange={handleRegisterChange}
                      />
                      {registerErrors.owners_address && (
                        <p className="text-red-500 text-xs mt-1">{registerErrors.owners_address}</p>
                      )}
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Owners Mobile No: *</label>
                      <input
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="text"
                        name="owner_mobile_no"
                        value={registerFormData.owner_mobile_no}
                        onChange={handleRegisterChange}
                      />
                      {registerErrors.owner_mobile_no && (
                        <p className="text-red-500 text-xs mt-1">{registerErrors.owner_mobile_no}</p>
                      )}
                    </div>
                  </>
                )}

                {(registerFormData.role === "retailer" || registerFormData.role === "stockist") && (
                  <div className="mt-4 flex align-center justify-center">
                    <div className="">
                      <label className="block text-gray-700 text-sm font-bold mb-2">District *</label>
                      <input
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="text"
                        name="district"
                        value={registerFormData.district}
                        onChange={handleRegisterChange}
                      />
                      {registerErrors.district && (
                        <p className="text-red-500 text-xs mt-1">{registerErrors.district}</p>
                      )}
                    </div>
                    &nbsp;
                    <div className="">
                      <label className="block text-gray-700 text-sm font-bold mb-2">State *</label>
                      <input
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="text"
                        name="state"
                        value={registerFormData.state}
                        onChange={handleRegisterChange}
                      />
                      {registerErrors.state && <p className="text-red-500 text-xs mt-1">{registerErrors.state}</p>}
                    </div>
                  </div>
                )}
                {(registerFormData.role === "retailer" ||
                  registerFormData.role === "stockist" ||
                  registerFormData.role === "employee") && (
                  <>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">User Name *</label>
                      <input
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="text"
                        name="user_name"
                        value={registerFormData.user_name}
                        onChange={handleRegisterChange}
                      />
                      {registerErrors.user_name && (
                        <p className="text-red-500 text-xs mt-1">{registerErrors.user_name}</p>
                      )}
                    </div>
                    <div className="mt-4 flex align-center justify-center">
                      <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email Address *</label>
                        <input
                          className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                          type="email"
                          name="email"
                          value={registerFormData.email}
                          onChange={handleRegisterChange}
                        />
                        {registerErrors.email && <p className="text-red-500 text-xs mt-1">{registerErrors.email}</p>}
                      </div>
                      &nbsp;
                      <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Contact No: *</label>
                        <input
                          className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                          type="text"
                          name="contact_no"
                          value={registerFormData.contact_no}
                          onChange={handleRegisterChange}
                        />
                        {registerErrors.contact_no && (
                          <p className="text-red-500 text-xs mt-1">{registerErrors.contact_no}</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex align-center justify-center">
                      <div className="">
                        <div className="flex justify-between">
                          <label className="block text-gray-700 text-sm font-bold mb-2">Password *</label>
                          <button type="button" onClick={toggleROnePasswordVisibility} className="focus:outline-none">
                            {showROnePassword ? (
                              <img src="/img/icon/eye_open.svg" alt="open" />
                            ) : (
                              <img src="/img/icon/eye_closed.svg" alt="close" />
                            )}
                          </button>
                        </div>
                        <input
                          className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                          type={showROnePassword ? "text" : "password"}
                          name="password_one"
                          value={registerFormData.password_one}
                          onChange={handleRegisterPasswordChange}
                        />
                      </div>
                      &nbsp;
                      <div className="">
                        <div className="flex justify-between">
                          <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password *</label>
                          <button type="button" onClick={toggleRTwoPasswordVisibility} className="focus:outline-none">
                            {showRTwoPassword ? (
                              <img src="/img/icon/eye_open.svg" alt="open" />
                            ) : (
                              <img src="/img/icon/eye_closed.svg" alt="close" />
                            )}
                          </button>
                        </div>
                        <input
                          className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                          type={showRTwoPassword ? "text" : "password"}
                          name="password_two"
                          value={registerFormData.password_two}
                          onChange={handleRegisterPasswordChange}
                        />
                      </div>
                    </div>
                    {registerErrors.password && <p className="text-red-500 text-xs mt-1">{registerErrors.password}</p>}
                  </>
                )}

                <div className="mt-8">
                  <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                    Signup
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="border-b w-1/5 md:w-1/4"></span>
                  <div
                    onClick={() => {
                      toggleForm();
                    }}
                    className="text-xs text-gray-500 uppercase"
                  >
                    or sign In
                  </div>
                  <span className="border-b w-1/5 md:w-1/4"></span>
                </div>
              </>
            ) : (
              <>
                <p className="text-xl text-gray-600 text-center">Welcome back!</p>

                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                  <input
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    type="email"
                    name="email"
                    value={loginFormData.email}
                    onChange={handleLoginChange}
                  />
                  {loginErrors.email && <p className="text-red-500 text-xs mt-1">{loginErrors.email}</p>}
                </div>
                <div className="mt-4">
                  <div className="flex justify-between">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <button type="button" onClick={toggleLoginPasswordVisibility} className="focus:outline-none">
                      {showLoginPassword ? (
                        <img src="/img/icon/eye_open.svg" alt="open" />
                      ) : (
                        <img src="/img/icon/eye_closed.svg" alt="close" />
                      )}
                    </button>
                  </div>
                  <input
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    type={showLoginPassword ? "text" : "password"}
                    name="password"
                    value={loginFormData.password}
                    onChange={handleLoginChange}
                  />

                  {loginErrors.password && <p className="text-red-500 text-xs mt-1">{loginErrors.password}</p>}
                  <Link href="#" className="text-xs text-gray-500">
                    Forget Password?
                  </Link>
                </div>
                <div className="mt-8">
                  <button
                    onClick={() => handleButtonClick()}
                    className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                  >
                    Login
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="border-b w-1/5 md:w-1/4"></span>
                  <div
                    onClick={() => {
                      toggleForm();
                    }}
                    className="text-xs text-gray-500 uppercase"
                  >
                    or sign up
                  </div>
                  <span className="border-b w-1/5 md:w-1/4"></span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
