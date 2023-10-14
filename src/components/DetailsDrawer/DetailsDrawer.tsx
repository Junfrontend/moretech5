import { OfficeDetails } from '../OfficeDetails/OfficeDetails';
import UserRoute from '../UserRoute/UserRoute';

export default function DetailsDrawer() {
  return (
    <>
      <OfficeDetails />
      <UserRoute
        branchLocation={[55.478329, 37.298706]}
      />
    </>
  );
};
