import React, { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { PiSunDimFill } from "react-icons/pi";
import { IoMdMoon } from "react-icons/io";

export const DarkModeSwitch = () => {
  const { setTheme, resolvedTheme } = useNextTheme();
  const [selectedswitch, setSelectedSwitch] = useState(false);

  useEffect(() => {
    setSelectedSwitch(resolvedTheme === "DarkCCD");
  }, [resolvedTheme]);

  return (
    <Switch
      color="primary"
      isSelected={selectedswitch}
      onValueChange={(e) => {
        setSelectedSwitch(e);
        setTheme(e ? "DarkCCD" : "LightCCD");
      }}
      startContent={<IoMdMoon />
      }
      endContent={<PiSunDimFill />
      }
    />
  );
};



