import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import { Chip, IconButton, Menu, MenuItem, Stack, SvgIcon } from '@mui/material';
import { usePopover } from 'src/hooks/use-popover';

const options = [
  'Business',
  'Planning',
  'Frontend',
  'Design'
];

export const TaskLabels = (props) => {
  const { labels = [], onChange } = props;
  const popover = usePopover();

  const availableOptions = useMemo(() => {
    return options.filter((option) => !labels.includes(option));
  }, [labels]);

  const handleDelete = useCallback((label) => {
    const newLabels = labels.filter((item) => item !== label);

    onChange?.(newLabels);
  }, [labels, onChange]);

  const handleToggle = useCallback((label) => {
    let newLabels;

    const found = labels.find((item) => item === label);

    if (found) {
      newLabels = labels.filter((item) => item !== label);
    } else {
      newLabels = [...labels, label];
    }

    popover.handleClose();
    onChange?.(newLabels);
  }, [labels, popover, onChange]);

  const canAdd = availableOptions.length > 0;

  return (
    <>
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        gap={1}
      >
        {labels.map((label) => (
          <Chip
            key={label}
            label={label}
            onDelete={() => handleDelete(label)}
            size="small"
          />
        ))}
        <IconButton
          onClick={popover.handleOpen}
          ref={popover.anchorRef}
          disabled={!canAdd}
        >
          <SvgIcon fontSize="small">
            <PlusIcon />
          </SvgIcon>
        </IconButton>
      </Stack>
      <Menu
        anchorEl={popover.anchorRef.current}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom'
        }}
        onClose={popover.handleClose}
        open={popover.open}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
      >
        {availableOptions.map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleToggle(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

TaskLabels.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string.isRequired),
  onChange: PropTypes.func
};
