
// import React, { useEffect, useState } from 'react';
// import { State, City } from 'country-state-city';
// import axios from 'axios';
// import validator from 'validator';
// import { useAuth } from "../context/AuthContext";
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
// import { serviceType, timeSlot } from '../../../../BACKEND/app/validations/appointment-booking-validation';

// const AppointmentBooking = () => {
//   const { user } = useAuth(); // Get the authenticated user
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedState, setSelectedState] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');
//   const [selectedDealer, setSelectedDealer] = useState(null); // State for selected dealer

//   // State for form data
//   const [formData, setFormData] = useState({
//     userId: user ? user._id : '',
//     name: user ? user.username : '',
//     contact: '',
//     email: user ? user.email : '',
//     date: '',
//     timeSlot: '',
//     vehicleNumber: '',
//     serviceType: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [dialogOpen, setDialogOpen] = useState(false); // State for modal dialog

//   // Fetch states when the component mounts
//   useEffect(() => {
//     const fetchedStates = State.getStatesOfCountry('IN');
//     setStates(fetchedStates);
//   }, []);

//   // Fetch cities when a state is selected
//   const handleStateChange = (event) => {
//     const stateCode = event.target.value;
//     setSelectedState(stateCode);
//     setSelectedCity('');
//     const fetchedCities = City.getCitiesOfState('IN', stateCode);
//     setCities(fetchedCities);
//   };

//   // Handle city selection
//   const handleCityChange = (event) => {
//     setSelectedCity(event.target.value);
//   };

//   // Handle select dealer button click
//   const handleSelectDealer = (dealer) => {
//     setSelectedDealer(dealer);
//     alert(`Selected dealer: ${dealer.workshopName}`);
//   };

//   useEffect(() => {
//     if (selectedState && selectedCity) {
//       const stateName = getStateName(selectedState);
//       setLoading(true);
//       axios
//         .get(`http://localhost:3777/allPartnerList?state=${stateName}&city=${selectedCity}`)
//         .then((response) => {
//           setAppointments(response.data);
//           setError(null);
//         })
//         .catch((err) => {
//           setError('No dealer found in your location.');
//           setAppointments([]);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   }, [selectedState, selectedCity]);

//   const getStateName = (stateCode) => {
//     const state = states.find(s => s.isoCode === stateCode);
//     return state ? state.name : '';
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const validate = () => {
//     const errors = {};
//     if (!formData.name.trim()) errors.name = "Name is required";
//     if (!formData.contact.trim()) {
//       errors.contact = "Contact number is required";
//     } else if (!/^[0-9]{10}$/.test(formData.contact)) {
//       errors.contact = "Invalid mobile number. It should be a 10-digit number.";
//     }
//     if (!formData.email.trim()) {
//       errors.email = "Email is required";
//     } else if (!validator.isEmail(formData.email)) {
//       errors.email = "Invalid email format";
//     }
//     if (!formData.vehicleNumber.trim()) {
//       errors.vehicleNumber = "Vehicle registration number is required";
//     }
//     if (!formData.date.trim()) errors.date = "Date is required";
//     if (!formData.timeSlot) errors.timeSlot = "Time slot is required";
//     if (!formData.serviceType) errors.serviceType = "Service type is required";
//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         const response = await axios.post("http://localhost:3777/user/bookYourAppointment", {
//           ...formData,
//           dealerId: selectedDealer._id
//         });
//         alert("Booking registered successfully!");
//         setFormData({
//           userId: user._id,
//           name: user.username,
//           contact: '',
//           email: user.email,
//           date: '',
//           timeSlot: '',
//           vehicleNumber: '',
//           serviceType: ''
//         });
//         setSelectedDealer(null);
//         setDialogOpen(false); // Close dialog after successful booking
//       } catch (error) {
//         console.error("Error booking appointment:", error.response?.data || error.message);
//       }
//     } else {
//       setErrors(validationErrors);
//     }
//   };

//   const timeSlots = [
//     "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "12:00 PM - 01:00 PM", "01:00 PM - 02:00 PM",
//     "02:00 PM - 03:00 PM", "03:00 PM - 04:00 PM", "04:00 PM - 05:00 PM", "05:00 PM - 06:00 PM"
//   ];

//   const serviceTypes = [
//     "Ac Service & Repair", "Batteries", "Car Spa & Cleaning", "Clutch & Body Parts",
//     "Denting & Paint", "Detailing Service", "General Service", "Major Service",
//     "Oil Change", "Periodic Service", "Suspension & Fitment", "Tyre & Wheel",
//     "Windshield & Lights"
//   ];

//   return (
//     <div>
//       {/* State dropdown */}
//       <label htmlFor="state">Select State:</label>
//       <select id="state" value={selectedState} onChange={handleStateChange}>
//         <option value="">--Select State--</option>
//         {states.map((state) => (
//           <option key={state.isoCode} value={state.isoCode}>
//             {state.name}
//           </option>
//         ))}
//       </select>

//       {/* City dropdown */}
//       {selectedState && (
//         <>
//           <label htmlFor="city">Select City:</label>
//           <select id="city" value={selectedCity} onChange={handleCityChange}>
//             <option value="">--Select City--</option>
//             {cities.map((city) => (
//               <option key={city.name} value={city.name}>
//                 {city.name}
//               </option>
//             ))}
//           </select>
//         </>
//       )}

//       <h3>{`Dealer in ${selectedCity} ${getStateName(selectedState)}`}</h3>

//       {loading ? (
//         <div>Please select a state and city to continue booking.</div>
//       ) : error ? (
//         <div>{error}</div>
//       ) : appointments.length === 0 ? (
//         <div>No dealers found.</div>
//       ) : (
//         <div className="appointment-list">
//           {appointments.map((appointment) => (
//             <div key={appointment._id} className="appointment-card">
//               <h3>{appointment.workshopName}</h3>
//               <div>
//                 <strong>Shop Images:</strong>
//                 {appointment.shopImages.map((image, index) => (
//                   <img key={index} src={image} alt="Shop" width="200px" />
//                 ))}
//               </div>
//               <p><strong>Address:</strong> {appointment.address}, {appointment.city}, {appointment.state}, {appointment.pinCode}</p>
//               <div>
//                 <strong>Live Location:</strong>
//                 <p>Latitude: {appointment.liveLocation.lat}, Longitude: {appointment.liveLocation.lng}</p>
//               </div>
//               <button onClick={() => {
//                 handleSelectDealer(appointment);
//                 setDialogOpen(true); // Open dialog when dealer is selected
//               }}>
//                 Book Appointment
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Dialog for booking appointment */}
//       <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
//         <DialogTitle>Book An Appointment</DialogTitle>
//         <DialogContent>
//           <form>
//             <TextField
//               label="Name"
//               value={formData.name}
//               onChange={handleChange}
//               name="name"
//               fullWidth
//               margin="normal"
//               required
//             />
//             <TextField
//               label="Contact"
//               value={formData.contact}
//               onChange={handleChange}
//               name="contact"
//               fullWidth
//               margin="normal"
//               required
//               inputProps={{ pattern: "[0-9]{10}" }}
//             />
//             <TextField
//               label="Email"
//               value={formData.email}
//               onChange={handleChange}
//               name="email"
//               fullWidth
//               margin="normal"
//               required
//             />
//             <TextField
//               label="Vehicle Number"
//               value={formData.vehicleNumber}
//               onChange={handleChange}
//               name="vehicleNumber"
//               fullWidth
//               margin="normal"
//               required
//             />
//             <TextField
//               label="Date"
//               type="date"
//               value={formData.date}
//               onChange={handleChange}
//               name="date"
//               fullWidth
//               margin="normal"
//               required
//             />
//             <TextField
//               label="Time Slot"
//               value={formData.timeSlot}
//               onChange={handleChange}
//               name="timeSlot"
//               fullWidth
//               margin="normal"
//               required
//             />
//             <TextField
//               label="Service Type"
//               value={formData.serviceType}
//               onChange={handleChange}
//               name="serviceType"
//               fullWidth
//               margin="normal"
//               required
//             />
//           </form>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDialogOpen(false)} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} color="primary">
//             Confirm Booking
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default AppointmentBooking;


import React, { useEffect, useState } from 'react';
import { State, City } from 'country-state-city'; // Importing from the package
import axios from 'axios';
import validator from 'validator';
import { useAuth } from "../context/AuthContext";

const AppointmentBooking = () => {
  const { user } = useAuth(); // Get the authenticated user
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDealer, setSelectedDealer] = useState(null); // State for selected dealer

  // State for form data
  const [formData, setFormData] = useState({
    userId: user ? user._id : '',
    name: user ? user.username : '',
    contact: '',
    email: user ? user.email : '',
    date: '',
    timeSlot: '',
    vehicleNumber: '',
    serviceType: ''
  });

  const [errors, setErrors] = useState({});

  // Fetch states when the component mounts
  useEffect(() => {
    const fetchedStates = State.getStatesOfCountry('IN'); // Fetch states of India
    setStates(fetchedStates);
  }, []);

  // Fetch cities when a state is selected
  const handleStateChange = (event) => {
    const stateCode = event.target.value;
    setSelectedState(stateCode);
    setSelectedCity('');
    const fetchedCities = City.getCitiesOfState('IN', stateCode); // Fetch cities based on the selected state
    setCities(fetchedCities);
  };

  // Handle city selection
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  // Handle select dealer button click
  const handleSelectDealer = (dealer) => {
    setSelectedDealer(dealer); // Store the selected dealer in state
    alert(`Selected dealer: ${dealer.workshopName}`);
  };

  useEffect(() => {
    if (selectedState && selectedCity) {
      const stateName = getStateName(selectedState);
      setLoading(true); // Set loading to true before fetching data
      axios
        .get(`http://localhost:3777/allPartnerList?state=${stateName}&city=${selectedCity}`)
        .then((response) => {
          setAppointments(response.data);
          setError(null); // Reset any previous error
        })
        .catch((err) => {
          setError('No dealer found in your location.');
          setAppointments([]); // Clear appointments if there's an error
        })
        .finally(() => {
          setLoading(false); // Set loading to false after fetching data
        });
    }
  }, [selectedState, selectedCity]);

  const getStateName = (stateCode) => {
    const state = states.find(s => s.isoCode === stateCode);
    return state ? state.name : '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.contact.trim()) {
      errors.contact = "Contact number is required";
    } else if (!/^[0-9]{10}$/.test(formData.contact)) {
      errors.contact = "Invalid mobile number. It should be a 10-digit number.";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validator.isEmail(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.vehicleNumber.trim()) {
      errors.vehicleNumber = "Vehicle registration number is required";
    }
    if (!formData.date.trim()) errors.date = "Date is required";
    if (!formData.timeSlot) errors.timeSlot = "Time slot is required";
    if (!formData.serviceType) errors.serviceType = "Service type is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post("http://localhost:3777/user/bookYourAppointment", {
          ...formData,
          dealerId: selectedDealer._id // Include the dealer ID in the request
        });
        alert("Booking registered successfully!");
        setFormData({
          userId: user._id,
          name: user.username,
          contact: '',
          email: user.email,
          date: '',
          timeSlot: '',
          vehicleNumber: '',
          serviceType: ''
        });
        setSelectedDealer(null); // Clear selected dealer after successful booking
      } catch (error) {
        console.error("Error booking appointment:", error.response?.data || error.message);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const timeSlots = [
    "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "12:00 PM - 01:00 PM", "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM", "03:00 PM - 04:00 PM", "04:00 PM - 05:00 PM", "05:00 PM - 06:00 PM"
  ];

  const serviceTypes = [
    "Ac Service & Repair", "Batteries", "Car Spa & Cleaning", "Clutch & Body Parts",
    "Denting & Paint", "Detailing Service", "General Service", "Major Service",
    "Oil Change", "Periodic Service", "Suspension & Fitment", "Tyre & Wheel",
    "Windshield & Lights"
  ];

  return (
    <div>
      {/* State dropdown */}
      <label htmlFor="state">Select State:</label>
      <select id="state" value={selectedState} onChange={handleStateChange}>
        <option value="">--Select State--</option>
        {states.map((state) => (
          <option key={state.isoCode} value={state.isoCode}>
            {state.name}
          </option>
        ))}
      </select>

      {/* City dropdown */}
      {selectedState && (
        <>
          <label htmlFor="city">Select City:</label>
          <select id="city" value={selectedCity} onChange={handleCityChange}>
            <option value="">--Select City--</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </>
      )}

      <h3>{`Dealer in ${selectedCity} ${getStateName(selectedState)}`}</h3>

      {loading ? (
        <div>Please select a state and city to continue booking.</div>
      ) : error ? (
        <div>{error}</div>
      ) : appointments.length === 0 ? (
        <div>No dealers found.</div>
      ) : (
        <div className="appointment-list">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="appointment-card">
              <h3>{appointment.workshopName}</h3>
              <div>
                <strong>Shop Images:</strong>
                {appointment.shopImages.map((image, index) => (
                  <img key={index} src={image} alt="Shop" width="200px" />
                ))}
              </div>
              <p><strong>Address:</strong> {appointment.address}, {appointment.city}, {appointment.state}, {appointment.pinCode}</p>
              <div>
                <strong>Live Location:</strong>
                <p>Latitude: {appointment.liveLocation.lat}, Longitude: {appointment.liveLocation.lng}</p>
              </div>
              <button onClick={() => handleSelectDealer(appointment)}>Book Appointment</button>
            </div>
          ))}
        </div>
      )}

      {/* Show form only if a dealer is selected */}
      {selectedDealer && (
        <div>
          <h2>Book An Appointment with {selectedDealer.workshopName}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              {errors.name && <p>{errors.name}</p>}
            </div>
            <div>
              <label>Contact:</label>
              <input type="text" name="contact" value={formData.contact} onChange={handleChange} required pattern="[0-9]{10}" />
              {errors.contact && <p>{errors.contact}</p>}
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              {errors.email && <p>{errors.email}</p>}
            </div>
            <div>
              <label>Vehicle Number:</label>
              <input type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} required />
              {errors.vehicleNumber && <p>{errors.vehicleNumber}</p>}
            </div>
            <div>
              <label>Date:</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
              {errors.date && <p>{errors.date}</p>}
            </div>
            <div>
              <label>Time Slot:</label>
              <select name="timeSlot" value={formData.timeSlot} onChange={handleChange} required>
                <option value="">--Select Time Slot--</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
              {errors.timeSlot && <p>{errors.timeSlot}</p>}
            </div>
            <div>
              <label>Service Type:</label>
              <select name="serviceType" value={formData.serviceType} onChange={handleChange} required>
                <option value="">--Select Service Type--</option>
                {serviceTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.serviceType && <p>{errors.serviceType}</p>}
            </div>
            <button type="submit">Book Appointment</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AppointmentBooking;

// import React, { useEffect, useState } from 'react';
// import { State, City } from 'country-state-city'; // Importing from the package
// import axios from 'axios';

// const AppointmentBooking = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedState, setSelectedState] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');

//   // Fetch states when the component mounts
//   useEffect(() => {
//     const fetchedStates = State.getStatesOfCountry('IN'); // Fetch states of India
//     setStates(fetchedStates);
//   }, []);

//   // Fetch cities when a state is selected
//   const handleStateChange = (event) => {
//     const stateCode = event.target.value;
//     setSelectedState(stateCode);
//     setSelectedCity('');
//     const fetchedCities = City.getCitiesOfState('IN', stateCode); // Fetch cities based on the selected state
//     setCities(fetchedCities);
//   };

//   // Handle city selection
//   const handleCityChange = (event) => {
//     setSelectedCity(event.target.value);
//   };

//   useEffect(() => {
//     if (selectedState && selectedCity) {
//       // Get the full state name
//       const stateName = getStateName(selectedState);
      
//       // Fetch appointment details based on full state name and selected city
//       setLoading(true); // Set loading to true before fetching data
//       axios
//         .get(`http://localhost:3777/allPartnerList?state=${stateName}&city=${selectedCity}`)
//         .then((response) => {
//           setAppointments(response.data);
//           setError(null); // Reset any previous error
//         })
//         .catch((err) => {
//           setError('No dealer found in your location.');
//           setAppointments([]); // Clear appointments if there's an error
//         })
//         .finally(() => {
//           setLoading(false); // Set loading to false after fetching data
//         });
//     }
//   }, [selectedState, selectedCity]);

//   // Helper function to get the full state name from the selected state code
//   const getStateName = (stateCode) => {
//     const state = states.find(s => s.isoCode === stateCode);
//     return state ? state.name : '';
//   };

//   const stateName = getStateName(selectedState); // Get the full state name

//   return (
//     <div>
//       {/* State dropdown */}
//       <label htmlFor="state">Select State:</label>
//       <select id="state" value={selectedState} onChange={handleStateChange}>
//         <option value="">--Select State--</option>
//         {states.map((state) => (
//           <option key={state.isoCode} value={state.isoCode}>
//             {state.name}
//           </option>
//         ))}
//       </select>

//       {/* City dropdown */}
//       {selectedState && (
//         <>
//           <label htmlFor="city">Select City:</label>
//           <select id="city" value={selectedCity} onChange={handleCityChange}>
//             <option value="">--Select City--</option>
//             {cities.map((city) => (
//               <option key={city.name} value={city.name}>
//                 {city.name}
//               </option>
//             ))}
//           </select>
//         </>
//       )}

//       <h3>Dealers in {selectedCity}, {stateName}</h3>
//       {loading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div>
//           <div>{error}</div>
//           <p>Please select a state and city to continue.</p>
//         </div>
//       ) : appointments.length === 0 ? (
//         <div>No appointments found.</div>
//       ) : (
//         <div className="appointment-list">
//           {appointments.map((appointment) => (
//             <div key={appointment._id} className="appointment-card">
//               <h3>{appointment.workshopName}</h3>
//               {/* <p><strong>Mobile:</strong> {appointment.mobileNumber}</p> */}
//               <div>
//                 <strong>Shop Images:</strong>
//                 {appointment.shopImages.map((image, index) => (
//                   <img key={index} src={image} alt="Shop" width="200px" />
//                 ))}
//               </div>
//               <p><strong>Address:</strong> {appointment.address}, {appointment.city}, {appointment.state}, {appointment.pinCode}</p>

              

//               <div>
//                 <strong>Live Location:</strong>
//                 <p>Latitude: {appointment.liveLocation.lat}, Longitude: {appointment.liveLocation.lng}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AppointmentBooking;



//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


// import React, { useState } from "react";
// import axios from "axios";
// import validator from "validator";
// import { useAuth } from "../context/AuthContext";
// import { Navigate } from "react-router-dom";

// export default function AppointmentBooking() {
  // const { user } = useAuth();

  // const [formData, setFormData] = useState({
  //   userId: user ? user._id : '', // Ensure userId is included
  //   name: user ? user.username : '',
  //   contact: '',
  //   email: user ? user.email : '',
  //   date: '',
  //   timeSlot: '',
  //   vehicleNumber: '',
  //   serviceType: ''
  // });

  // const [errors, setErrors] = useState({});

  // // Redirect to login if user is not logged in
  // if (!user) {
  //   alert("Please login to add Vehicle");
  //   return <Navigate to="/login" />;
  // }

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value
  //   });
  // };

  // const handleButtonClick = (name, value) => {
  //   setFormData({
  //     ...formData,
  //     [name]: value
  //   });
  // };

  // const validate = () => {
  //   const errors = {};

  //   if (!formData.name.trim()) errors.name = "Name is required";

  //   if (!formData.contact.trim()) {
  //     errors.contact = "Contact number is required";
  //   } else if (!/^[0-9]{10}$/.test(formData.contact)) {
  //     errors.contact = "Invalid mobile number. It should be a 10-digit number.";
  //   }

  //   if (!formData.email.trim()) {
  //     errors.email = "Email is required";
  //   } else if (!validator.isEmail(formData.email)) {
  //     errors.email = "Invalid email format";
  //   }

  //   if (!formData.vehicleNumber.trim()) {
  //     errors.vehicleNumber = "Vehicle registration number is required";
  //   } else if (!validator.isAlphanumeric(formData.vehicleNumber.replace(/\s/g, ""))) {
  //     errors.vehicleNumber = "Invalid Vehicle registration number format";
  //   }

  //   if (!formData.date.trim()) errors.date = "Date is required";
  //   if (!formData.timeSlot) errors.timeSlot = "Time slot is required";
  //   if (!formData.serviceType) errors.serviceType = "Service type is required";

  //   return errors;
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const validationErrors = validate();
  //   if (Object.keys(validationErrors).length === 0) {
  //     try {
  //       const response = await axios.post("http://localhost:3777/user/bookYourAppointment", formData);
  //       console.log("Appointment booked successfully:", response.data);

  //       alert("Booking registered successfully!");

  //       // Reset form
  //       setFormData({
  //         userId: user._id,  
  //         name: user.username,
  //         contact: '',
  //         email: user.email,
  //         date: '',
  //         timeSlot: '',
  //         vehicleNumber: '',
  //         serviceType: ''
  //       });

  //     } catch (error) {
  //       console.error("Error booking appointment:", error.response?.data || error.message);
  //     }
  //   } else {
  //     setErrors(validationErrors);
  //   }
  // };

  // const timeSlots = [
  //   "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "12:00 PM - 01:00 PM", "01:00 PM - 02:00 PM",
  //   "02:00 PM - 03:00 PM", "03:00 PM - 04:00 PM", "04:00 PM - 05:00 PM", "05:00 PM - 06:00 PM"
  // ];

  // const serviceTypes = [
  //   "Ac Service & Repair", "Batteries", "Car Spa & Cleaning", "Clutch & Body Parts",
  //   "Denting & Paint", "Detailing Service", "General Service", "Major Service",
  //   "Oil Change", "Periodic Service", "Suspension & Fitment", "Tyre & Wheel",
  //   "Windshield & Lights"
  // ];

  // return (
  //   <div>
  //     <h2>Book An Appointment</h2>
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <label>Name:</label>
  //         <input
  //           type="text"
  //           name="name"
  //           value={formData.name}
  //           onChange={handleChange}
  //           required
  //         />
  //         {errors.name && <p>{errors.name}</p>}
  //       </div>

  //       <div>
  //         <label>Contact:</label>
  //         <input
  //           type="text"
  //           name="contact"
  //           value={formData.contact}
  //           onChange={handleChange}
  //           required
  //           pattern="[0-9]{10}"
  //         />
  //         {errors.contact && <p>{errors.contact}</p>}
  //       </div>

  //       <div>
  //         <label>Email:</label>
  //         <input
  //           type="email"
  //           name="email"
  //           value={formData.email}
  //           onChange={handleChange}
  //           required
  //         />
  //         {errors.email && <p>{errors.email}</p>}
  //       </div>

  //       <div>
  //         <label>Vehicle Number:</label>
  //         <input
  //           type="text"
  //           name="vehicleNumber"
  //           value={formData.vehicleNumber}
  //           onChange={handleChange}
  //           required
  //         />
  //         {errors.vehicleNumber && <p>{errors.vehicleNumber}</p>}
  //       </div>

  //       <div>
  //         <label>Date:</label>
  //         <input
  //           type="date"
  //           name="date"
  //           value={formData.date}
  //           onChange={handleChange}
  //           required
  //         />
  //         {errors.date && <p>{errors.date}</p>}
  //       </div>

  //       <div>
  //         <label>Time Slot:</label>
  //         <div>
  //           {timeSlots.map((slot) => (
  //             <button
  //               type="button"
  //               key={slot}
  //               className={formData.timeSlot === slot ? 'selected' : ''}
  //               onClick={() => handleButtonClick('timeSlot', slot)}
  //             >
  //               {slot}
  //             </button>
  //           ))}
  //         </div>
  //         {errors.timeSlot && <p>{errors.timeSlot}</p>}
  //       </div>

  //       <div>
  //         <label>Service Type:</label>
  //         <div>
  //           {serviceTypes.map((type) => (
  //             <button
  //               type="button"
  //               key={type}
  //               className={formData.serviceType === type ? 'selected' : ''}
  //               onClick={() => handleButtonClick('serviceType', type)}
  //             >
  //               {type}
  //             </button>
  //           ))}
  //         </div>
  //         {errors.serviceType && <p>{errors.serviceType}</p>}
  //       </div>

  //       <button type="submit">Book Appointment</button>
  //     </form>

  //     <style jsx>{`
  //       button {
  //         margin: 5px;
  //         padding: 10px;
          
  //         background-color: #1a11ea;
  //         color: white;
  //       }

  //       button:hover {
  //         background-color: #89e3ef;
  //         color: white;
  //       }
  //     `}</style>
  //   </div>
  // );
// }


