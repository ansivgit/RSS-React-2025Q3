import { NotFound } from '../not-found/not-found';
import type { University } from '../../types';

type RowProps = {
  id: number;
  name: string;
  country: string;
  web_page: string;
};

const TableRow = (rowData: RowProps) => {
  const { id, name, country, web_page } = rowData;

  return (
    <tr>
      <th scope="row">{id}</th>
      <td className="d-flex">{name}</td>
      <td>{country}</td>
      <td>{web_page}</td>
    </tr>
  );
};

export const Result = ({ data }: { data: University[] }) => {
  if (!data.length) {
    return <NotFound />;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">University Name</th>
          <th scope="col">Country</th>
          <th scope="col">Website</th>
        </tr>
      </thead>
      <tbody>
        {data.map((university: University, index: number) => {
          const { name, country, web_pages } = university;
          return (
            <TableRow
              key={index}
              id={index + 1}
              name={name}
              country={country}
              web_page={web_pages[0]}
            />
          );
        })}
      </tbody>
    </table>
  );
};
