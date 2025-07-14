import { Button } from '../button/button';

export const Search = () => {
  return (
    <div className="d-grid gap-2 d-md-flex mb-3">
      <div className="col">
        <input
          type="text"
          className="form-control"
          placeholder="Enter country name"
          aria-label="Enter country name"
          onChange={(e) => console.log(666, e.target.value)}
        />
      </div>
      <div className="col">
        <Button text="Search" onClick={() => console.log('clicked')} />
      </div>
    </div>
  );
};
