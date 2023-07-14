import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./ConnectVia.scss"
// import "./RightDrawer.scss";

type Anchor = 'right';

interface DrawerContentProps {
  anchor: Anchor;
  open: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const DrawerContent: React.FC<DrawerContentProps> = ({
  anchor,
  open,
  onClose,
  title,
  content,
}) => {
  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    onClose();
  };

  return (
    <Box
      sx={{ width: 551 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className="allBox"
    >
      <div className='rightDrawer_header'>
        <p className='rightDrawer_header_title'>{title}</p>
        <IconButton sx={{ p: 0 }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className='rightDrawer_content'>
        <div className='rightDrawer_content_next_title'>
          <ArrowBackIcon /> <span>{title}</span>
        </div>
        {content}
      </div>
    </Box>
  );
};

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (anchor: Anchor, open: boolean) => () => {
    setState({ ...state, [anchor]: open });
  };

  const handleWebHookClick = () => {
    setOpen(true);
  };

  const content = (
    <React.Fragment>
      {/* Customize the content for ConnectVia component */}
      <p>Connect Via Webhook</p>
      {/* Additional content specific to ConnectVia */}
    </React.Fragment>
  );

  return (
    <div>
      <React.Fragment>
        <Button onClick={() => setOpen(true)}>Configure</Button>
        <SwipeableDrawer
          anchor='right'
          open={open}
          onClose={() => setOpen(false)}
          disableSwipeToOpen
          PaperProps={{
            onClick: (event) => event.stopPropagation(),
            sx: { backgroundColor: '#F9F8F8' },
          }}
        >
          <DrawerContent
            anchor=''
            open={open}
            onClose={() => setOpen(false)}
            title='Configure Lead'
            content={content}
          />
        </SwipeableDrawer>
        <div className='connectVia' onClick={handleWebHookClick}>
          Connect Via
        </div>
      </React.Fragment>
    </div>
  );
}
