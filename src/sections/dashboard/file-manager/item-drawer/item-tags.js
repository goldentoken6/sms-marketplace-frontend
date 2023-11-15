import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import { Chip, IconButton, Menu, MenuItem, Stack, SvgIcon } from '@mui/material';
import { usePopover } from 'src/hooks/use-popover';

const options = [
  'Invoices',
  'Work',
  'Business',
  'Planning',
  'Frontend',
  'Design'
];

export const ItemTags = (props) => {
  const { onChange, tags = [] } = props;
  const popover = usePopover();

  const availableOptions = useMemo(() => {
    return options.filter((option) => !tags.includes(option));
  }, [tags]);

  const handleDelete = useCallback((label) => {
    const newLabels = tags.filter((item) => item !== label);

    onChange?.(newLabels);
  }, [tags, onChange]);

  const handleToggle = useCallback((label) => {
    let newLabels;

    const found = tags.find((item) => item === label);

    if (found) {
      newLabels = tags.filter((item) => item !== label);
    } else {
      newLabels = [...tags, label];
    }

    popover.handleClose();
    onChange?.(newLabels);
  }, [tags, popover, onChange]);

  const canAdd = availableOptions.length > 0;

  return (
    <>
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        gap={1}
      >
        {tags.map((label) => (
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

ItemTags.propTypes = {
  onChange: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired)
};
