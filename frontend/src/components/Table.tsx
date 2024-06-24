import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface TableProps {
  header?: Array<string>;
  data?: Array<Array<string>>;
  className?: string;
}

const extractLinks = (input: string): string[] | string => {
  // Regular expression to match URLs (non-greedy)
  const urlPattern = /https?:\/\/[^\s]+?(?=(?:https?:\/\/|\s|$))/g;

  // Use the match method to find all URLs in the input string
  const matches = input.match(urlPattern);

  // If no matches were found, return the input string as is
  if (!matches) {
    return input;
  }

  if (matches.length === 1) {
    return matches[0];
  }

  // Otherwise, return the array of matched URLs
  return matches;
};

function extractTextAndUrl(input: string): [string, string] | null {
  const regex = /(.*?)\s?(https?:\/\/\S+)/;
  const match = input.match(regex);

  if (match) {
    const [, text, url] = match;
    return [text ?? '', url ?? ''];
  }

  return null;
}

const Table: React.FC<TableProps> = ({ header, data, className = '' }) => (
  <div className='max-w-screen-xl'>
    <div
      className={twMerge(
        'mt-6 shadow-sm border border-stone-700 rounded-lg overflow-x-auto',
        className,
      )}
    >
      <table className='w-full table-auto text-sm text-left'>
        {header ? (
          <thead className=' bg-yellow-500 font-medium border-b border-stone-700 uppercase'>
            <tr className='divide-x divide-stone-700'>
              {header?.map((head, idx) => (
                <th key={idx} className='py-3 px-6'>
                  {head}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody className='divide-y divide-stone-700'>
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex} className='divide-x divide-stone-700'>
              {row?.map((val, idx) => {
                const links = extractLinks(val);
                if (Array.isArray(links)) {
                  return (
                    <td key={idx} className='h-full pr-4 pl-10 py-1'>
                      <ul className='flex flex-col gap-2 list-disc'>
                        {links.map((href, index) => (
                          <li key={`${href}_${index}`}>
                            <Link to={href} className='text-blue hover:underline' target='_blank'>
                              {href}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </td>
                  );
                }
                if (val.includes('http')) {
                  const data = extractTextAndUrl(val);
                  if (data) {
                    return (
                      <td key={idx} className='px-4 py-1 font-inter'>
                        <Link to={data[1]} className='text-blue hover:underline' target='_blank'>
                          {data[0] || data}
                        </Link>
                      </td>
                    );
                  }
                }
                return (
                  <td key={idx} className='px-4 py-1 font-inter'>
                    {val}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Table;
