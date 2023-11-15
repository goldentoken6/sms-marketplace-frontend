import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal';
import { Chip, IconButton, Input, Menu, MenuItem, Stack, SvgIcon } from '@mui/material';
import { usePopover } from 'src/hooks/use-popover';

export const ColumnHeader = (props) => {
  const { tasksCount, name, onClear, onDelete, onRename } = props;
  const popover = usePopover();
  const [nameCopy, setNameCopy] = useState(name);

  const handleNameReset = useCallback(() => {
    setNameCopy(name);
  }, [name]);

  useEffect(() => {
      handleNameReset();
    },
    
    [name]);

  const handleNameBlur = useCallback(() => {
    if (!nameCopy) {
      setNameCopy(name);
      return;
    }

    if (nameCopy === name) {
      return;
    }

    onRename?.(nameCopy);
  }, [nameCopy, name, onRename]);

  const handleNameChange = useCallback((event) => {
    setNameCopy(event.target.value);
  }, []);

  const handleNameKeyUp = useCallback((event) => {
    if (event.code === 'Enter') {
      if (nameCopy && nameCopy !== name) {
        onRename?.(nameCopy);
      }
    }
  }, [nameCopy, name, onRename]);

  const handleClear = useCallback(() => {
    popover.handleClose();
    onClear?.();
  }, [popover, onClear]);

  const handleDelete = useCallback(() => {
    popover.handleClose();
    onDelete?.();
  }, [popover, onDelete]);

  return (
    <>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          pr: 2,
          py: 1
        }}
      >
        <Input
          disableUnderline
          fullWidth
          onBlur={handleNameBlur}
          onChange={handleNameChange}
          onKeyUp={handleNameKeyUp}
          placeholder="Column Name"
          sx={{
            '& .MuiInputBase-input': {
              borderRadius: 1.5,
              fontWeight: 500,
              overflow: 'hidden',
              px: 2,
              py: 1,
              textOverflow: 'ellipsis',
              wordWrap: 'break-word',
              '&:hover, &:focus': {
                backgroundColor: (theme) => theme.palette.mode === 'dark'
                  ? 'neutral.800'
                  : 'neutral.100'
              }
            }
          }}
          value={nameCopy}
        />
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
        >
          <Chip label={tasksCount} />
          <IconButton
            edge="end"
            onClick={popover.handleOpen}
            ref={popover.anchorRef}
          >
            <SvgIcon>
              <DotsHorizontalIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
      </Stack>
      <Menu
        anchorEl={popover.anchorRef.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}
        keepMounted
        onClose={popover.handleClose}
        open={popover.open}
      >
        <MenuItem onClick={handleClear}>
          Clear
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

ColumnHeader.propTypes = {
  tasksCount: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onClear: PropTypes.func,
  onDelete: PropTypes.func,
  onRename: PropTypes.func
};
