import { ComponentType } from "react";

export type KofiButtonProps = {
  kofiId: string;
  color?: string;
  label?: string;
  useSeparator?: boolean;
  dismissible?: boolean;
  dismissable?: boolean;
};

declare const KofiButton: ComponentType<KofiButtonProps>;

export default KofiButton;
export { KofiButton };
