import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Typography from 'src/components/Typography';

const DynamicParagraph: React.FC<{ item: any }> = ({ item }) => {
  return (
    <>
      {item?.text?.trim()?.startsWith('http') ? (
        <Link to={item?.text?.trim()} target='_blank'>
          <Typography
            className={classNames('text-blue hover:underline my-4', {
              '!text-xl lg:!text-3xl font-libreBaskerville': item.isHeading,
            })}
            variant={item.isHeading ? 'heading' : 'subTitle'}
          >
            {item.text?.trim()}
          </Typography>
        </Link>
      ) : (
        <Typography
          className={classNames('my-4 mt-6', {
            '!text-xl lg:!text-3xl font-libreBaskerville ': item.isHeading,
          })}
          variant={item.isHeading ? 'heading' : 'subTitle'}
        >
          {item.text?.trim()}
        </Typography>
      )}
    </>
  );
};

export default DynamicParagraph;
