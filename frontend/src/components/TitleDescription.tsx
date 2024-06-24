import { twMerge } from 'tailwind-merge';
import Typography from './Typography';

interface Props {
  title?: string;
  description?: string;
  titleStyle?: string;
  descriptionStyle?: string;
}

const TitleDescription = ({
  title,
  description,
  titleStyle = '',
  descriptionStyle = '',
}: Props) => {
  return (
    <>
      {title ? (
        <Typography
          variant='subTitle2'
          className={twMerge(
            'text-center font-inter text-heading-color font-semibold mt-10',
            titleStyle,
          )}
        >
          {title}
        </Typography>
      ) : null}
      {description ? (
        <Typography className={twMerge('flex text-center justify-center my-5', descriptionStyle)}>
          {description}
        </Typography>
      ) : null}
    </>
  );
};

export default TitleDescription;
