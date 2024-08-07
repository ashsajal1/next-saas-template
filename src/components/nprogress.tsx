// Create a Providers component to wrap your application with all the components requiring 'use client', such as next-nprogress-bar or your different contexts...
'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { useTheme } from "next-themes"

const Nprogress = () => {
  const { theme } = useTheme();
  return (
    <>
      <ProgressBar
        height="3px"
        color={theme === 'dark'? '#fff':'#000'}
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default Nprogress;