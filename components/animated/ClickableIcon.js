import {useTheme} from 'styled-components';
import { SuccessIcon } from '../icons/Common';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {BackArrow, HandshakeIcon, NotifyAll, RemindIcon} from '../icons/Actions'

const ClickableIcon = ({ type }) => {
  const [clicked, setClicked] = useState(false);
  const theme = useTheme();

  const handleCopy = () => {
    setClicked(true);
  };


  return (
    <>
      <div
        onClick={() => {
          handleCopy();
        }}
      >
        {!clicked ? (
          <>
            {type === 'handshake' && <HandshakeIcon width={15} height={15} color={theme.colors.icon}/>}
            {type === 'remind' && <RemindIcon width={15} height={15} color={theme.colors.icon}/>}
            {type === 'back' && <BackArrow width={15} height={15} color={theme.colors.icon}/>}
            {type === 'notifyAll' && <NotifyAll width={30} height={30} color={theme.colors.icon}/> }
          </>
        ) : (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ y: -4 }}
            transition={{
              duration: 0.1,
              scale: [0, 1, 0.5, 1],
            }}
          >
            <SuccessIcon width={20} height={20} />
          </motion.div>
        )}
      </div>
    </>
  );
};
export default ClickableIcon;
