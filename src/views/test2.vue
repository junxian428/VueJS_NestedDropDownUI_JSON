<template>





    <div id="app">
      
    
      <div class="sidebar">
          <p>User ID: </p>
          <p>Token: </p>
          <br>
          <div class="sidebar-content">
    
            <p style="color:white;"><button><a href="#/">IoT Dashboard</a></button></p>
            <br>
    
          <p style="color:white;"><u>Supported Protocol</u></p>
          <p style="color:white;"><button><a href="#/MQTT">MQTT Mosquitto Endpoint</a></button></p>
          <p style="color:white;"><button><a href="#/IoTCore">AWS IoT Core Endpoint</a></button></p>
          <p style="color:white;"><button><a href="#/HTTPS">HTTPS API Endpoint</a></button></p>
          <p style="color:white;"><button><a href="#/GRPC">GRPC Endpoint</a></button></p>
          <p style="color:white;"><button><a href="#/WebSocket">Web Socket Endpoint</a></button></p>
          <p style="color:white;"><button><a href="#/Modbus">Modbus TCP Endpoint</a></button></p>
          <p style="color:white;"><button><a href="#/OPCUA">OPC UA Endpoint</a></button></p>
          <p style="color:white;"><button><a href="#/COAP">COAP Endpoint</a></button></p>
          <br>
          <br>
          <p style="color:white;"><u>Official SDK Package</u></p>
          <p style="color:white;"><button><a href="#/IoTCore">Robomatics IoT SDK</a></button></p>
          <p style="color:white;"><button><a href="#/IoTCore">Third Party API</a></button></p>
          <br>
          <br>
          <p style="color:white;"><u>Developer Support</u></p>
          <p style="color:white;"><button><a href="#/Documentation">Documentation</a></button></p>
            <!-- Sidebar content -->
            </div>
        </div>
    
        <div class="navbar">
            <a href="#" @click="selectedLevel = 'Level 5 ERP'">Level 5 ERP</a>
            <a href="#" @click="selectedLevel = 'Level 4 WMS'">Level 4 WMS</a>
            <a href="#" @click="selectedLevel = 'Level 4 MES'">Level 4 MES</a>
            <a href="#" @click="selectedLevel = 'Level 3 SCADA/ HMI'">Level 3 SCADA/ HMI</a>
            <a href="#" @click="selectedLevel = 'Level 2 PLC'">Level 2 PLC</a>
            <a href="#" @click="selectedLevel = 'Level 1 Sensor and Actuator'">Level 1 Sensor and Actuator</a>
    
          <div class="logout">
            <a href="#" @click="logout">Logout</a>
          </div>
    
          </div>
    
    
    
        <div class="main" style="margin-top:50px; color:white;">
          <h2>MQTT Protocol</h2>
          <br>
          <br>
          <img src="Mosquitto.png" style="width:250px;">
          <div style="text-align:left;">
                <p>Endpoint : </p>
                <p>Port Number :</p>
          </div>
          <!-- -->
    
    
    
    
    
    
          <div>

      </div>
    
    
    
      <div>

        <!---->
        <table>

      <div v-for="item in jsonData" :key="item.id">
        <tr>
            <td>

                <div @click="toggleDropdown('both', item.id)" class="row">
                    <div style="margin-top:20px; margin-bottom:20px;">{{ item.name }}</div>
                </div>

            </td>
            <td>
                <div @click="toggleDropdown('both', item.id)" class="row">
                    <div style="margin-top:20px; margin-bottom:20px;">{{ item.token }}</div>
                </div>
            </td>
            <td width="20%"><button class="red-alert-button" style="margin-left:30px;">Delete PLC</button></td>
            <td width="20%"><button class="ocean-blue-edit-button"  style="margin-left: 30px;">Edit Token</button></td>
                 
        </tr>
        
        <div v-if="item.showAnalogAndDigital" class="dropdown">
                    <!---->
                       
                    <!--Digital-->

                    <div @click="toggleDropdown('digital', item.id)" class="row" style="border: 2px solid black;">
                        <div style="margin-top:20px; margin-bottom:20px;">Digital</div>

                  
                    </div>

         
                        <div v-if="item.showDigitalDropdown" class="dropdown">


                                <div  style="border: 2px solid black;">
                                    <!---<div style="margin-top:20px; margin-bottom:20px;">Digital: {{ item.digital }}</div>-->
                                    <!--For Loop PLC Digital Address / Channel-->
                                    <div v-for="(address, addressIndex) in item.addresses" :key="addressIndex" >

                                        <div @click="handleAddressClick(item.id, address.id)" style="margin-top:20px; margin-bottom:20px; cursor: pointer;">
                                            <div style="display:inline; " >{{ address.id }} | </div>
                                            <div style="display:inline; " >{{ address.name }} | </div>
                                            <div v-if="!address.editing"  style="display:inline"> | {{ address.description }}</div>

                                            
                                    </div>

                                    </div>
                                    <!--End For Loop-->


                                </div>

                                <div v-if="item.showBitAddress" class="dropdown" style="border: 2px solid black;">
                                    <div>
                                        <div v-for="item in bitAddress" :key="item.id" class="row" @click="toggleDropdown('both', item.id)">
                                        <div  style="margin-top:20px; margin-bottom:20px;">{{ item.bitAddress }} - {{ item.description }}</div>
                                        </div>
                                    </div>
                                </div>

                                <!---->
                                <div v-if="item.showAnalogDropdown" class="dropdown" style="border: 2px solid black;">
                                    <div style="margin-top:20px; margin-bottom:20px;"> Analog: {{ item.analog }}</div>
                                </div>


                    </div>
                    <!---->
                    <!---->
                       
                    <!--Analog-->

                            <div @click="toggleDropdown('analog', item.id)" class="row" style="border: 2px solid black;">
                                <div style="margin-top:20px; margin-bottom:20px;">Analog</div>
                            </div>

                            <div v-if="item.showAnalogDropdown" class="dropdown" style="border: 2px solid black;">
                                <div style="margin-top:20px; margin-bottom:20px;"> Analog: {{ item.analog }}</div>
                            </div>
     
        </div>
  

      </div>

    </table>
    <!-- -->
    </div>
    
    
    
 
    
    

    
          
      
        </div>
      </div>
    
    
    
    </template>
 
 <script>
 export default {
   data() {
     return {
       bitAddress: [
           {id:1 , bitAddress: 100.01, description:"Alarm"},
           {id:2 , bitAddress: 100.02, description:"Alarm"},
           {id:3 , bitAddress: 100.03, description:"Alarm"},
       ],
       bitAddress_2: [
           {id:1 , bitAddress: 200.01, description:"Alarm"},
           {id:2 , bitAddress: 300.02, description:"Alarm"},
           {id:3 , bitAddress: 400.03, description:"Alarm"},
       ],
       jsonData: [
         {  id: 1, 
            name: 'PLC 1', 
            token: 'TOKEN123' ,
            analog: 'Analog 1', 
            digital: '100', 
            showAnalogDropdown: false, 
            showDigitalDropdown: false, 
            showAnalogAndDigital: false, 
            showBitAddress: false,
            addresses: [
              {id:100, name: '100', description: 'Description for Address 1 in PLC 4', editing: false },
              { id:101, name: '101', description: 'Description for Address 2 in PLC 4', editing: false },
              // Add more addresses with descriptions here
            ], 
        },
         {   id: 2, 
            name: 'PLC 2',
            token: 'TOKEN124' ,
            analog: 'Analog 2',
            digital: '101',
            showAnalogDropdown: false, 
            showDigitalDropdown: false,
            showAnalogAndDigital: false, 
            showBitAddress: false,
            addresses: [
                {id:100, name: '100', description: 'Description for Address 1 in PLC 4', editing: false },
                {id:101, name: '101', description: 'Description for Address 2 in PLC 4', editing: false },
              // Add more addresses with descriptions here
            ], 
        },
         { id: 3, 
           name: 'PLC 3', 
           token: 'TOKEN125' ,
           analog: 'Analog 3',
          digital: '102',
          showAnalogDropdown: false, 
          showDigitalDropdown: false,
           showAnalogAndDigital: false, 
           showBitAddress: false,
           addresses: [
                {id:100, name: '100', description: 'Description for Address 1 in PLC 4', editing: false },
                {id:101, name: '101', description: 'Description for Address 2 in PLC 4', editing: false },
              // Add more addresses with descriptions here
            ], 
        },

         // Add more items as needed
       ],
     };
   },
   methods: {
     toggleDropdown(type, id) {
       const index = this.jsonData.findIndex(item => item.id === id);
       if (index !== -1) {
         if (type === 'both') {
           this.jsonData[index].showAnalogAndDigital = !this.jsonData[index].showAnalogAndDigital;
           this.jsonData[index].showAnalogDropdown = false;
           this.jsonData[index].showDigitalDropdown = false;
         } else if (type === 'analog') {
           this.jsonData[index].showAnalogDropdown = !this.jsonData[index].showAnalogDropdown;
           this.jsonData[index].showDigitalDropdown = false;
         } else if (type === 'digital') {
           this.jsonData[index].showDigitalDropdown = !this.jsonData[index].showDigitalDropdown;
           this.jsonData[index].showAnalogDropdown = false;
         } else if (type === 'bitaddress') {
            alert(id);
           this.jsonData[index].showBitAddress = !this.jsonData[index].showBitAddress;
         }
       }
     },
     handleAddressClick(itemid, addressId) {
      // Do something with the clicked addressId
      console.log("Clicked address ID:", addressId);
      alert("Item ID: " + itemid +  " Address ID"+ addressId);
      // Call your toggleDropdown function here if needed
      // toggleDropdown('bitaddress', addressId);
      const index = this.jsonData.findIndex(item => item.id === itemid);
      this.jsonData[index].showBitAddress = !this.jsonData[index].showBitAddress;

    },
   },
 };
 </script>
    
    <style>
      .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999; /* Set the z-index to place the modal on top */
      }
    
      .modal-content {
        background-color: #fde2e8; /* Set the background color to white-pink */
        border: 2px solid #ff1493; /* Add a 2px border with pink color */
        padding: 20px;
        border-radius: 5px;
        color:black;
      }
    
    
      .modal-content button {
        /* Add styles for the "Close" button */
        border: 1px solid #000; /* Black border */
        padding: 8px 12px; /* Adjust padding as needed */
        background-color: #fff; /* White background */
        color: #000; /* Black text color */
        cursor: pointer;
        border-radius: 5px;
      }
    
      .modal-content button:hover {
        background-color: #000; /* Change background color on hover */
        color: #fff; /* Change text color on hover */
      }
    
    /* Styling for the black alert button */
    .dark-cancel-button {
      padding: 10px 20px;
      background-color: black; /* Change the background color to black */
      color: white;
      border: 2px solid darkgray; /* Change the border color to a darker shade of gray */
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }
    
    /* On hover effect */
    .dark-cancel-button:hover {
      background-color: darkgray; /* Change the hover background color to a darker shade of gray */
    }
    
    /* On click effect */
    .dark-cancel-button:active {
      background-color: dimgray; /* Use a darker shade of gray on click */
    }
    
    
    
    /* Styling for the purple alert button */
    .purple-save-button {
      padding: 10px 20px;
      background-color: purple; /* Change the background color to purple */
      color: white;
      border: 2px solid darkpurple; /* Change the border color to a darker shade of purple */
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }
    
    /* On hover effect */
    .purple-save-button:hover {
      background-color: darkpurple; /* Change the hover background color to a darker shade of purple */
    }
    
    /* On click effect */
    .purple-save-button:active {
      background-color: #800080; /* Use a darker shade of purple on click (here using hex code) */
    }
    
    
    
    
    /* Styling for the grass green alert button */
    .grass-green-add-button {
      padding: 10px 20px;
      background-color: #3CB371; /* Use your preferred grass green color code */
      color: white;
      border: 2px solid #2E8B57; /* Use a slightly darker shade of grass green for the border */
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }
    
    /* On hover effect */
    .grass-green-add-button:hover {
      background-color: #2E8B57; /* Use a slightly darker shade of grass green on hover */
    }
    
    /* On click effect */
    .grass-green-add-button:active {
      background-color: #228B22; /* Use a darker shade of grass green on click */
    }
    
    
    /* Styling for the ocean blue alert button */
    .ocean-blue-edit-button {
      padding: 10px 20px;
      background-color: #007BAC; /* Use your preferred ocean blue color code */
      color: white;
      border: 2px solid #005A80; /* Use a slightly darker shade of ocean blue for the border */
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }
    
    /* On hover effect */
    .ocean-blue-edit-button:hover {
      background-color: #005A80; /* Use a slightly darker shade of ocean blue on hover */
    }
    
    /* On click effect */
    .ocean-blue-edit-button:active {
      background-color: #00416A; /* Use a darker shade of ocean blue on click */
    }
    
    /* Styling for the red alert button */
    .red-alert-button {
      padding: 10px 20px;
      background-color: red;
      color: white;
      border: 2px solid darkred;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }
    
    /* On hover effect */
    .red-alert-button:hover {
      background-color: darkred;
    }
    
    /* On click effect */
    .red-alert-button:active {
      background-color: crimson;
    }
    
    
    
    .sidebar {
      width: 200px;
      position: fixed; /* Position the sidebar as fixed */
      top: 0;
      bottom: 0; /* Extend the sidebar to the bottom */
      left: 0;
      overflow-y: auto; /* Enable vertical scrolling if content overflows */
      background-color: #111;
      padding-top: 20px;
      padding-bottom: 20px; /* Add padding at the bottom of the sidebar */
      color: white; /* Set text color */
      
    }
    
    .sidebar-content {
      /* Adjust padding as needed */
      padding: 20px;
    }
    
    .sidebar a {
      display: block;
      color: white;
      padding: 16px;
      text-decoration: none;
    }
    
    .sidebar a:hover {
      background-color: #ddd;
      color: black;
    }
    
    /* Main content styles */
    .main {
      margin-left: 200px; /* Same as the width of the sidebar */
      padding: 20px;
    }
    
    table {
      border-collapse: collapse;
      width: 100%;
    }
    
    th, td {
      border: 1px solid black;
      padding: 8px;
      text-align: left;
    }
    
    
    /* Navbar styles */
    .navbar {
      background-color: #333;
      overflow: hidden;
      width: 100%;
      position: fixed; /* Position the navbar as fixed */
      top: 0; /* Place the navbar at the top */
      left: 200px; /* Align with the sidebar */
      z-index: 2; /* Add z-index to position the navbar above the main content */
    }
    
    .navbar a {
      float: left;
      display: block;
      color: white;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
    }
    
    .navbar a:hover {
      background-color: #ddd;
      color: black;
    }
    
    /* Right-aligned logout button */
    .logout {
      display: flex;
      align-items: center;
    }
    
    .logout a {
      color: white;
      padding: 14px 16px;
      text-decoration: none;
    }
    
    .logout a:hover {
      background-color: #ddd;
      color: black;
    }
    
    
    
    /* Style for the dropdown buttons */
    .dropdown-button {
      margin-top: 10px; /* Add margin to the top */
      margin-bottom: 10px; /* Add margin to the bottom */
      padding: 5px 10px; /* Adjust padding as needed */
      color: black; /* Black text color */
      cursor: pointer;
      border-radius: 5px;
      text-align: center; /* Center-align the button content */
    
    }
    
    .dropdown-option {
      display: block;
      width: 100%;
      padding: 10px;
      border: none;
      text-align: left;
      cursor: pointer;
    }
    
    </style>