import { useDispatch } from 'react-redux';
import { setDrawerClose } from '../../redux/UserLocationSlice/UserLocationSlice';

export default function UserRoute({branchLocation}: any) {
  const dispatch = useDispatch();

  const handleRouteSelect = () => {
    dispatch(setDrawerClose());
  };

  return (
    <>
      <div>Маршрут {branchLocation}</div>
      <label>
        <input
          type="radio"
          value="car"
        />
      </label>

      <label>
        <input
          type="radio"
          value="public"
        />
      </label>

      <label>
        <input
          type="radio"
          value="walking"
        />
      </label>

      <label>
        <input
          type="radio"
          value="bicycle"
        />
      </label>

      <label>
        <input
          type="radio"
          value="scooter"
        />
      </label>

      <label>
        <input
          type="radio"
          value="scooter"
        />
      </label>

      <label>
        <input
          type="radio"
          value="taxi"
        />
      </label>
      <button onClick={handleRouteSelect}>Сюда</button>
    </>
  );
}
