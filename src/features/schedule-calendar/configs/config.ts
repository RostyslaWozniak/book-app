/**
 * Calendar configuration constants
 */

const DEFAULT_CELL_SIZE = 60;

export const CALENDAR_CONFIG = {
  // Cell size options for the calendar grid
  CELL_SIZES: [
    { label: "S", value: 40 },
    { label: "M", value: DEFAULT_CELL_SIZE },
    { label: "L", value: 120 },
  ],
  // Default cell size in pixels
  DEFAULT_CELL_SIZE: DEFAULT_CELL_SIZE,

  DEFAULT_START_HOURS: 7,
  DEFAULT_VISIBLE_HOURS: 10,
};
