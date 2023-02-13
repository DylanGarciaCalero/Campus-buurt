/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import * as queries from '../../queries';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

interface Props {}

interface Initiative {
}

interface EducationalProgram {
  
}

interface Campus {
    id: number;
    name: string;
    address: string;
    description: string;
    email: string;
    phone: string;
    website: string;
    initiatives: Initiative[];
    educationalPrograms: EducationalProgram[];
}
interface CampusData {
    campus: Campus;
}

interface Token {
  role: string;
  email: string;
  sub: string;
}

interface Organisation {
  id: number,
  name: string,
}

interface UserData {
  id: number,
  organisation: Organisation,
}

interface UserInfo {
  userById: UserData
}

interface Initiative {
  id: number,
  name: string,
  accepted: boolean,
  createdAt: string,
  updatedAt: string,
  date: string,
}

interface OrganisationData {
  initiatives: Initiative[];
}

interface OrganisationInfo {
  organisationById: OrganisationData
}

interface CollabInitiative {
    id: number,
}

interface CollabCampus {
    id: number,
}

interface CollabInvite {
    initiative: CollabInitiative;
    campus: CollabCampus;
}

interface CollabInvites {
    collabInvites: CollabInvite[];
}


interface Props {}

const InviteInfo = (props: Props) => {
    const [ userId, setUserId ] = useState('');

    let jwtToken = Cookies.get('token');
    useEffect(() => {
      if (jwtToken) {
        let decoded: Token = jwtDecode(jwtToken);
        console.log(decoded);
        setUserId(decoded.sub)
      }
    }, [jwtToken]);

    const userInformation = useQuery<UserInfo>(queries.GET_USER, {
        variables: {
            id: userId
        }
      });
  
      let orgId = userInformation.data?.userById.organisation.id;
  
      const organisationInitiativeInfo = useQuery<OrganisationInfo>(queries.GET_ORGANISATIONBYID, {
        variables: {
          id: orgId
        }
      })

      const collabs = useQuery<CollabInvites>(queries.COLLAB_INVITES);

      console.log(organisationInitiativeInfo.data?.organisationById.initiatives);
      if (collabs.loading || organisationInitiativeInfo.loading) return <div>Loading data</div>
    return (
      <>
      {
          collabs.data &&
          organisationInitiativeInfo.data &&
          collabs.data.collabInvites.map((invite) => {
              organisationInitiativeInfo.data?.organisationById.initiatives.map((initiative) => {
                  if (invite.initiative.id == initiative.id) {
                      console.log("match!")
                      return (
                          <div>
                              <p>{invite.initiative.id}</p>
                              <p>{invite.campus.id}</p>
                          </div>
                      );
                  }
              })
          })
      }

      </>
    );
};

export default InviteInfo;
