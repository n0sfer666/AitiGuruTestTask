import { ChevronDown } from "./icons/ChevronDown";
import { Email } from "./icons/Email";
import { Lock } from "./icons/Lock";
import { Logo } from "./icons/Logo";
import { MoreHorizontal } from "./icons/MoreHorizontal";
import { Plus } from "./icons/Plus";
import { RefreshCw } from "./icons/RefreshCw";
import { Search } from "./icons/Search";
import { Star } from "./icons/Star";
import { User } from "./icons/User";
import { X } from "./icons/X";

export { iconColor } from "./iconColor";
export type { IconColor } from "./iconColor";
export { ChevronDown } from "./icons/ChevronDown";

export { Email } from "./icons/Email";
export { Lock } from "./icons/Lock";
export { Logo } from "./icons/Logo";
export { MoreHorizontal } from "./icons/MoreHorizontal";
export { Plus } from "./icons/Plus";
export { RefreshCw } from "./icons/RefreshCw";
export { Search } from "./icons/Search";
export { Star } from "./icons/Star";
export { User } from "./icons/User";
export { X } from "./icons/X";
export type { IconProps } from "./types";

export const Icon = {
  Logo,
  User,
  Lock,
  Email,
  Search,
  Plus,
  ChevronDown,
  X,
  Star,
  RefreshCw,
  MoreHorizontal,
} as const;

export type IconName = keyof typeof Icon;

export default Icon;
