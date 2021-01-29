#ifndef CONFIG_H
#define CONFIG_H

// Mod4 is Super, Mod1 is Alt
#define MODKEY Mod4Mask
#define PRIMARY_SIZE 0.5
#define BORDER_WIDTH 2

// Border colors (plain old CSS hex codes work here)
#define FOCUS "rgb:00/FF/FA"
#define UNFOCUS "rgb:0D/0D/0D"

// Set terminal and app runner/menu here
const char *menucmd[] = {"st", "-e", "run.sh", NULL};
const char *termcmd[] = {"st", NULL};

#define DESKTOPCHANGE(K, N) \
  {MODKEY, K, change_desktop, {.i = N}}, \
  {MODKEY | ShiftMask, K, client_to_desktop, {.i = N}}

// Keybinds
static struct key keys[] = {
  // Modifier(s), Key, Function, Args

  // Change split size
  {MODKEY, XK_h, decrease, {NULL}},
  {MODKEY, XK_l, increase, {NULL}},

  // Change focus/active
  {MODKEY, XK_j, next_win, {NULL}},
  {MODKEY, XK_k, prev_win, {NULL}},

  // Move windows on the stacked size up and down
  {MODKEY | ShiftMask, XK_j, move_down, {NULL}},
  {MODKEY | ShiftMask, XK_k, move_up, {NULL}},

  // To do with modes and things
  {MODKEY | ShiftMask, XK_Return, swap_primary, {NULL}},
  {MODKEY | ControlMask, XK_space, switch_mode, {NULL}},
  {MODKEY, XK_f, switch_float, {NULL}},

  // Run commands
  {MODKEY, XK_space, spawn, {.com = menucmd}},
  {MODKEY, XK_Return, spawn, {.com = termcmd}},

  // Move floats
  {MODKEY | ControlMask, XK_h, move_float, {.xy = {-5, 0}}},
  {MODKEY | ControlMask, XK_l, move_float, {.xy = {5, 0}}},
  {MODKEY | ControlMask, XK_k, move_float, {.xy = {0, -5}}},
  {MODKEY | ControlMask, XK_j, move_float, {.xy = {0, 5}}},

  // Change between desktops; add here if you need more
  DESKTOPCHANGE(XK_1, 0),
  DESKTOPCHANGE(XK_2, 1),
  DESKTOPCHANGE(XK_3, 2),
  DESKTOPCHANGE(XK_4, 3),
};

#endif
