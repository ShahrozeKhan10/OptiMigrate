const getInitials = (name: string) => {
  if (!name) return '';
  const names = name.split(' ');

  if (!names[0] || !names.length) return '';

  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1]?.substring(0, 1).toUpperCase();
  }
  return initials;
};

export const UserAvatar: React.FC<{
  name: string | undefined;
  onClick?: () => void;
}> = ({ name = '', onClick }) => (
  <div
    onClick={onClick}
    className='cursor-pointer w-10 h-10 rounded-full flex-center font-semibold text-heading-color bg-bg-card'
  >
    {getInitials(name)}
  </div>
);
