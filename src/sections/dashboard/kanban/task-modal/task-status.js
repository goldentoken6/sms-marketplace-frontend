import { useCallback, useEffect, useState } from 'react';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import { Button, ButtonGroup, MenuItem, Popover } from '@mui/material';
import { usePopover } from 'src/hooks/use-popover';

export const TaskStatus = (props) => {
  const { onChange, options = [], value } = props;
  const popover = usePopover();
  const [currentOption, setCurrentOption] = useState(() => {
    return options.find((option) => option.value === value);
  });

  useEffect(() => {
    const option = options.find((option) => option.value === value);
    setCurrentOption(option);
  }, [options, value]);

  const handleOptionConfirm = useCallback(() => {
    if (!currentOption) {
      return;
    }

    onChange?.(currentOption.value);
  }, [currentOption, onChange]);

  const handleOptionSelect = useCallback((value) => {
    const option = options.find((option) => option.value === value);
    popover.handleClose();
    setCurrentOption(option);
  }, [options, popover]);

  return (
    <>
      <ButtonGroup
        ref={popover.anchorRef}
        variant="contained"
        size="small"
      >
        <Button onClick={handleOptionConfirm}>
          Submit as {currentOption?.label}
        </Button>
        <Button
          size="small"
          onClick={popover.handleToggle}
        >
          <ChevronDownIcon />
        </Button>
      </ButtonGroup>
      <Popover
        anchorEl={popover.anchorRef.current}
        disableScrollLock
        onClose={popover.handleClose}
        open={popover.open}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom'
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === value}
            onClick={() => handleOptionSelect(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
};
