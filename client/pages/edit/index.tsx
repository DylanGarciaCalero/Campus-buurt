import React, { useEffect } from 'react';
import * as queries from '../../queries';
import Datagrid from '../../component/admin/Datagrid';
import AdminLayout from '../../layouts/AdminLayout';
import { useRouter } from 'next/router';

interface Props {}

const Home = (props: Props) => {
  const router = useRouter();

  useEffect(() => {
    router.push('/edit/campus');
  }, [router]);

  return <AdminLayout></AdminLayout>;
};

export default Home;
