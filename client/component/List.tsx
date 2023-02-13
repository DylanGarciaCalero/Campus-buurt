import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { useQuery } from '@apollo/client';
import * as queries from '../queries';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ListItem } from '../component/styles/ListItem.style.js';
import { FaUniversity } from 'react-icons/fa';

interface Campus {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
}

interface CampusData {
  campuses: Campus[];
}

interface Organisation {
  id: number;
  name: string;
}

interface OrganisationData {
  organisations: Organisation[];
}

interface Props {
  view: string;
  query: string;
}

const List = (props: Props) => {

  const campuses = useQuery(queries.CAMPUSES_MAP);
  if (campuses.error) return <p>Campus Error: {campuses.error.message}</p>;

  const organisations = useQuery(queries.ORGANISATIONS);
  if (organisations.error)
    return <p>Organisation error: {organisations.error.message}</p>;

  const [selectedId, setSelectedId] = useState<number>(0);
  const router = useRouter();
  if (selectedId !== 0) {
    router.push({
      pathname: '/campus/' + selectedId,
    });
  }

  if (props.view === 'campus') {
    return (
      !campuses.loading &&
      campuses.data &&
      campuses.data.campuses.map((campus: any) => {
        return (
          props.query.length > 1 && campus.name.includes(props.query) ? 
          <Link href={`/campus/${campus.id}`} passHref key={campus.id}>
            <ListItem id={campus.id}>
              <div className='flex w-full flex-row items-center justify-between'>
                <FaUniversity className='w-10 h-10 ml-4'/>
                <h3 className='w-9/12 p-1'>{campus.name}</h3>
                <h3 className='mr-10'>Lees meer..</h3>
              </div>
            </ListItem>
          </Link> : props.query === '' || props.query.length < 2 ?
          <Link href={`/campus/${campus.id}`} passHref key={campus.id}>
          <ListItem id={campus.id}>
            <div className='flex w-full flex-row items-center justify-between'>
              <FaUniversity className='w-10 h-10 ml-4'/>
              <h3 className='w-9/12 p-1'>{campus.name}</h3>
              <h3 className='mr-10'>Lees meer..</h3>
            </div>
          </ListItem>
        </Link> : ''
        )
      })
    );
  } else if (props.view === 'organisatie') {
    return (
      !organisations.loading &&
      organisations.data &&
      organisations.data.organisations.map((organisation: any) => {
        return (
          props.query.length > 1 && organisation.name.includes(props.query) ?
          <Link
            href={`/organisation/${organisation.id}`}
            passHref
            key={organisation.id}
          >
            <ListItem id={organisation.id}>
              <div className='flex w-full flex-row items-center justify-between'>
                <img className='h-10 w-10 rounded-full ml-4' src={organisation.logo} alt={organisation.name+'logo'} />
                <h3 className='w-9/12 p-1'>{organisation.name}</h3>
                <h3 className='mr-10'>Lees meer..</h3>
              </div>
            </ListItem>
          </Link> : props.query === '' || props.query.length < 2 ?
          <Link
          href={`/organisation/${organisation.id}`}
          passHref
          key={organisation.id}
        >
          <ListItem id={organisation.id}>
            <div className='flex w-full flex-row items-center justify-between'>
              <img className='h-10 w-10 rounded-full ml-4' src={organisation.logo} alt={organisation.name+'logo'} />
              <h3 className='w-9/12 p-1'>{organisation.name}</h3>
              <h3 className='mr-10'>Lees meer..</h3>
            </div>
          </ListItem>
        </Link> : ''
        );
      })
    );
  }
};

export default List;
