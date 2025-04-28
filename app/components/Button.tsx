interface ButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  title: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

export default function Button({ disabled, onClick, title, type = 'button' }: ButtonProps) {
  return (
    <button
      className={`
        ${
          disabled
            ? `border border-(--disabled-border) bg-(--disabled-background) text-(--disabled-text)`
            : `border border-(--border) bg-(--primary) text-(--surface) hover:bg-(--accent)`
        }
        p-3 rounded-lg cursor-pointer
      `}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
