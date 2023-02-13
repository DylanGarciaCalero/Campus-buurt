import React from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import * as queries from '../../../queries';
import { useQuery } from '@apollo/client';

interface Props {}

const Invitations = (props: Props) => {
  const { loading, error, data } = useQuery(queries.INVITATIONS);

  if (data) {
    console.log(data);
  } else if (error) {
    console.log(error);
  }

  return (
    <AdminLayout>
      <h1>Invitations</h1>
    </AdminLayout>
  );
};

export default Invitations;
