export type BaseProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  asChild?: boolean;
};
