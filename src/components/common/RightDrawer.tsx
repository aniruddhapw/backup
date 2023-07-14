import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import WebhookIcon from '@mui/icons-material/Webhook';
import "./RightDrawer.scss";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ConnectVia from 'components/ConnectVia';
import DeliveryIcon from 'assets/icons/icon-park-outline_delivery';
import CustomerServiceIcon from 'assets/icons/CustomerServiceIcon';
import SdkIcon from 'assets/icons/SdkIcon';

type Anchor =  'right';

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
   
    right: false,
    showConnectVia: false, // New state for controlling ConnectVia component
  });
  const [connectMethod,setConnectMethod]= React.useState("");
  const handleWebHookClick = (connectMethodOption:string) => {
    console.log(state.showConnectVia);
    setState({ ...state, showConnectVia: true });
    setConnectMethod(connectMethodOption);
    setOpen(false);
    console.log(state.showConnectVia);
  };

  const [open, setOpen] = React.useState(false);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };
    

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 551 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="allBox"
    >
      <div className='rightDrawer_header'>
         <p className='rightDrawer_header_title'>Configure Lead</p>
         <IconButton sx={{ p: 0 }} onClick={() =>  setOpen(false)} >
        <CloseIcon style={{color: 'black' }}  />
      </IconButton>
      </div>
      <div className='rightDrawer_content'>
        <p className='rightDrawer_content_title'>Connect Via</p>
        <div className='rightDrawer_options' onClick={()=>handleWebHookClick("WebHook")} >
           <div className="rightDrawer_options_content">
            <div className="circle1">
            <WebhookIcon  style={{color: 'white' }}/>
            </div>
            
            <div className="rightDrawer_options_content_text">
            <h4 className='rightDrawer_options_title'>WebHook</h4>
            <p>Definition or short instruction to connect via a webhook that can be more tha 2 lines</p>
            </div>
            <div className="arrow">
              <ArrowForwardIcon style={{color:'#BAC4C6'}} fontSize='small'/>
            </div>
           
           </div>
        </div>
        <div className='rightDrawer_options' onClick={()=>handleWebHookClick("WebHook")} >
           <div className="rightDrawer_options_content">
            <div className="circle1" style={{backgroundColor:"#019054"}}>
            
            <DeliveryIcon  />
            
            </div>
            
            <div className="rightDrawer_options_content_text">
            <h4 className='rightDrawer_options_title'>CRM</h4>
            <p>Definition or short instruction to connect via a webhook that can be more tha 2 lines</p>
            </div>
            <div className="arrow">
              <ArrowForwardIcon style={{color:'#BAC4C6'}} fontSize='small'/>
            </div>
           
           </div>
        </div>
        <div className='rightDrawer_options' onClick={()=>handleWebHookClick("WebHook")} >
           <div className="rightDrawer_options_content">
            <div className="circle1" style={{backgroundColor:"#D64C35"}}>
            {/* <WebhookIcon style={{color: 'white' }}/> */}
            <CustomerServiceIcon/>
            </div>
            
            <div className="rightDrawer_options_content_text">
            <h4 className='rightDrawer_options_title'>WebHook</h4>
            <p>Definition or short instruction to connect via a webhook that can be more tha 2 lines</p>
            </div>
            <div className="arrow">
              <ArrowForwardIcon style={{color:'#BAC4C6'}} fontSize='small'/>
            </div>
           </div>
        </div>
        <div className='rightDrawer_options' onClick={()=>handleWebHookClick("WebHook")} >
           <div className="rightDrawer_options_content">
            <div className="circle1" style={{ backgroundColor: "#D7AE1F" }}>
            {/* <WebhookIcon style={{color: 'white' }}/> */}
            <SdkIcon/>
            </div>
            
            <div className="rightDrawer_options_content_text">
            <h4 className='rightDrawer_options_title'>Install PRUUV sdk</h4>
            <p>Definition or short instruction to connect via a webhook that can be more tha 2 lines</p>
            </div>
            <div className="arrow">
              <ArrowForwardIcon style={{color:'#BAC4C6'}} fontSize='small'/>
            </div>
           </div>
        </div>
      </div>

    </Box>
  );

  return (
    <div>
    
        <React.Fragment >
          <Button onClick={() => setOpen(true)}>Configure</Button>
          <SwipeableDrawer
            // anchor={anchor}
            anchor='right'
            open={open}
            onClose={(event) => {
                // if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                //   return;
                // }
                 toggleDrawer(anchor, false);
                setOpen(false)
              }}
          
            // onOpen={toggleDrawer(anchor, true)}
            disableSwipeToOpen
              PaperProps={{
                onClick: (event) => event.stopPropagation(), // Prevent closing when clicking inside the drawer
                sx: { backgroundColor: '#F1F4F3' }, // Apply custom styles to change the background color
              }}
          >
            {list("right")}
          </SwipeableDrawer>
          {state.showConnectVia && <ConnectVia connectVia={connectMethod} />} {/* Render ConnectVia when showConnectVia state is true */}
        </React.Fragment>
    
    </div>
  );
}