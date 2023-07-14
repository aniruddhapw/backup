import React from 'react'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import './ConnectVia.scss'
import CustomizedSwitches from './common/Switch'
import WebhookIcon from '@mui/icons-material/Webhook'
import DeliveryIcon from 'assets/icons/icon-park-outline_delivery'
import CustomerServiceIcon from 'assets/icons/CustomerServiceIcon'
import SdkIcon from 'assets/icons/SdkIcon'
import MultipleSelectPlaceholder from './Select'

import { useState } from 'react'
import DropDownWithInput from './DropDownWithInput'
// import "./RightDrawer.scss";

type Anchor = 'right'
interface ConnectViaProps {
  connectVia: string
}

function ConnectVia({ connectVia }: ConnectViaProps) {
  const [state, setState] = useState({
    right: false,
  })
  const [isSwitchOn, setIsSwitchOn] = useState(false) // State to track the value of the switch
  const [activeButton, setActiveButton] = useState<number | null>(null)
  const [showMandatoryFields, setShowMandatoryFields] = useState<boolean>(true)
  const [showJsonView, setShowJsonView] = useState<boolean>(false)
  const [showTestResult, setShowTestResult] = useState<boolean>(false)
  const handleDataButtonClick = (buttonId: number) => {
    setActiveButton(buttonId)
    setShowMandatoryFields(buttonId === 1)
    setShowJsonView(buttonId === 2)
  }
  const handleRunTest = () => {
    setShowTestResult(true)
  }

  let iconComponent

  // Determine which icon component to render based on the prop
  if (connectVia === 'WebHook') {
    iconComponent = (
      <div className="circle">
        <WebhookIcon fontSize="small" style={{ color: 'white' }} />
      </div>
    )
  } else if (connectVia === 'CRM') {
    iconComponent = (
      <div className="circle">
        <DeliveryIcon />
      </div>
    )
  } else if (connectVia === 'CDP') {
    // Default icon if the prop doesn't match any specific value
    iconComponent = <CustomerServiceIcon />
  } else if (connectVia === 'PRUVV SDK') {
    iconComponent = <SdkIcon />
  }

  // Function to handle the switch toggle
  const handleSwitchToggle = () => {
    setIsSwitchOn(!isSwitchOn)
  }
  const [open, setOpen] = useState(false)
  const [selectedFields, setSelectedFields] = useState<string[]>([])

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setState({ ...state, [anchor]: open })
    }
  // const handleSelect = (selectedOption: string) => {
  //   console.log('Selected option:', selectedOption);
  // };
  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 520 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="allBox"
    >
      <div className="rightDrawer_header">
        <p className="rightDrawer_header_title">Configure Lead</p>
        <IconButton sx={{ p: 0 }} onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className="rightDrawer_content_next_title">
        <ArrowBackIcon /> <span>Connect Via </span>
        <div className="rightDrawer_content_next_iconTitle">
          {iconComponent} <div className="connectViaProp">{connectVia}</div>
        </div>
      </div>
      <div className="rightDrawer_content">
        {showTestResult && (
          <div className="testWarning">
            <div className="circleRed">!</div>
            <span className="testMessage">
              Test Unsucssesful. Missing Data From Response
            </span>
          </div>
        )}

        <div className="connectVia_label">
          <span className="label">Step Name</span>
          <input className="input" type="text" />
        </div>
        <div className="connectVia_label">
          <span className="label">{connectVia} URL</span>
          <input
            className="input"
            value="https://hooks.zapier.com/hooks/catch/10616644/bu8y9ta"
            type="text"
          />
        </div>
        <div className="line"></div>
        <div className="connectVia_label">
          <div className="connectVia_label_datafield">
            <span className="label">Add Data fields</span>
            <span className="label2">
              Enter the data fiels that you want to send from the other source
            </span>
            {/* <div className="jsonViewButton">
              <span className="jsonViewLabel">JSON View</span>
              <CustomizedSwitches onToggle={handleSwitchToggle} />
            </div> */}
          </div>
          <div className="dataBox">
            <div className="dataButtons">
              <button
                className={
                  activeButton === 1 ? 'dataFields active' : 'dataFields'
                }
                onClick={() => handleDataButtonClick(1)}
              >
                Data Fields
              </button>
              <button
                style={{ marginLeft: '10px' }}
                className={
                  activeButton === 2 ? 'dataFields active' : 'dataFields'
                }
                onClick={() => handleDataButtonClick(2)}
              >
                JSON View
              </button>
              {showJsonView && (
                <button onClick={() => handleRunTest()} className="runTestBtn">
                  Run test
                </button>
              )}
            </div>
            <div className="line"></div>
            {showMandatoryFields && (
              <>
                <div className="mandatoryField">
                  <span className="label">Mandatory Field</span>
                  <div className="fields">
                    <div className="field">GCPKEY</div>
                    <div className="field">CUSTOMER ID</div>
                    <div className="field">FORENAME</div>
                    <div className="field">SURNAME</div>
                    <div className="field">POSTCODE</div>
                    <div className="field">CITY</div>
                    <div className="field">MOBILE</div>
                    <div className="field">SURNAME</div>
                    <div className="field">SURNAME</div>
                  </div>
                </div>
                <DropDownWithInput />
              </>
            )}
            {showJsonView && (
              <div className="jsonViewBox">
                <div className="jsonData">
                  <div>{'{'}</div>
                  <div>"gcpkey":""</div>
                  <div>"Customer ID":""</div>
                  <div>"surname":""</div>
                  <div>"email":""</div>
                  <div>"mobile":""</div>
                  <div>"postcode":""</div>
                  <div>"mobile":""</div>
                  <div>"email":""</div>
                  <div>"mobile":""</div>
                  <div>"postcode":""</div>
                  <div>"mobile":""</div>
                  <div>{'}'}</div>
                </div>
              </div>
            )}
          </div>

          {/* <input className="largeInput" type="text" /> */}
          {/* <Select options={options} onSelect={handleSelect} />
           */}
          {/* <MultipleSelectPlaceholder
            initialSelectedOptions={selectedFields}
            onSelect={handleSelect}
          /> */}
        </div>
        {/* {isSwitchOn ? (
          <div className="jsonData">
            <div>{'{'}</div>
            <div>"gcpkey":""</div>
            <div>"Customer ID":""</div>
            <div>"surname":""</div>
            <div>"email":""</div>
            <div>"mobile":""</div>
            <div>"postcode":""</div>
            <div>"mobile":""</div>
            <div>{'}'}</div>
          </div>
        ) : (
          <div className="mandatoryField">
            <span className="label">Mandatory Field</span>
            <div className="fields">
              <div className="field">GCPKEY</div>
              <div className="field">CUSTOMER ID</div>
              <div className="field">FORENAME</div>
              <div className="field">SURNAME</div>
              <div className="field">POSTCODE</div>
              <div className="field">CITY</div>
              <div className="field">MOBILE</div>
              <div className="field">SURNAME</div>
              <div className="field">SURNAME</div>
            </div>
          </div>
        )} */}

        {selectedFields.length > 0 && (
          <div className="addedFields">
            <span className="label">Added Fields</span>
            <div className="fields">
              {selectedFields.map((field) => (
                <div style={{ display: 'inline-block' }}>
                  <div key={field} className="field">
                    {field}
                    <CloseIcon
                      fontSize="small"
                      onClick={() => handleRemoveField(field)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="cancelAndSave">
        <div className="cancelAndSaveButtons">
          <button className="cancelButton">Cancel</button>
          <button className="saveConfigrationButton">Save Configuration</button>
        </div>
      </div>
    </Box>
  )

  return (
    <div>
      <React.Fragment>
        <Button onClick={() => setOpen(true)}>Configure</Button>
        <SwipeableDrawer
          // anchor={anchor}
          anchor="right"
          open={open}
          onClose={(event) => {
            if (
              event &&
              event.type === 'keydown' &&
              (event.key === 'Tab' || event.key === 'Shift')
            ) {
              return
            }
            toggleDrawer(anchor, false)
            setOpen(false)
          }}
          // onOpen={toggleDrawer(anchor, true)}
          disableSwipeToOpen
          PaperProps={{
            onClick: (event) => event.stopPropagation(), // Prevent closing when clicking inside the drawer
            sx: { backgroundColor: '#F1F4F3' }, // Apply custom styles to change the background color
          }}
        >
          {list('right')}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  )
}
export default ConnectVia
