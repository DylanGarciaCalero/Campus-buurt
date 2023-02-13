import { useFormik } from "formik";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import React, { useEffect, useState } from "react";
import { FormStyle } from "../component/styles/Form.style.js"
import InputError from './forms/InputError';
import * as queries from '../queries';
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

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

const validationSchema = Yup.object().shape({
  initiativeId: Yup.number().label('initiativeId').max(35)
})

const InviteForm = (props: Props) => {
    const [ errorMessage, setErrorMessage] = React.useState<string>('');
    const [ value, setValue ] = React.useState<number>(0)

    const router = useRouter();
    const id:number = parseInt(router.query.id as string, 10);
    
    const campus = useQuery<CampusData>(queries.CAMPUS_DATA, {
        variables: {
            id:id
        }
    });

    const [ userId, setUserId ] = useState('');

    let jwtToken = Cookies.get('token');
    useEffect(() => {
      if (jwtToken) {
        let decoded: Token = jwtDecode(jwtToken);
        console.log(decoded);
        setUserId(decoded.sub)
      }
    }, [jwtToken]);

    const [createCollabInvite, { data, loading, error }] = useMutation(queries.CREATE_COLLAB);

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

    if (campus.loading || organisationInitiativeInfo.loading ) return <div>Loading campus data</div>
    
    return (
      (campus.data && organisationInitiativeInfo.data) ?
          <>
          <div className="flex flex-col justify-center bg-white mb-2 pb-8">
          <div className="bg-primary p-2 ">
            <h2 className="text-white"> <strong> {campus.data?.campus.name}</strong> uitnodigen voor een initiatief</h2>
          </div>
          <Formik
            validationSchema={validationSchema}
            initialValues={{ initiativeId: 0, campusId: 0}}
            onSubmit={async (data, { setSubmitting }) => {
              setSubmitting(true)
              data.campusId = id;
              if (value !== 0) {
                createCollabInvite(
                  {
                    variables: {
                      input: {
                        campusId: data.campusId,
                        initiativeId: value
                      }
                    }
                  }
                )
              } else {
                alert("please select a value")
              }
              setSubmitting(false)
            }}
          >
  
  {({ isSubmitting, handleSubmit, handleBlur, handleChange }) => (
          <Form className='pt-10 flex flex-col w-full max-w-4xl m-auto' onSubmit={handleSubmit}>
            <FormStyle>
            
            <select
              name="initiativeId"
              onBlur={handleBlur}
              onChange={handleChange}
            >
              <option key={0}> Choose an initiative </option>
              {
                organisationInitiativeInfo.data ?
                organisationInitiativeInfo.data.organisationById.initiatives.map((initiative:Initiative) => {
                  if (initiative.accepted) {
                    return (
                      <>
                      <option key={initiative.id} value={initiative.id} onClick={() => setValue(initiative.id)}>{initiative.name}</option>
                      </>
                    )
                  }
                }) : ''
              }
            </select>
            {errorMessage && <p>{errorMessage}</p>}
            <button type='submit' disabled={isSubmitting}>
              Uitnodigen
            </button>
            </FormStyle>
          </Form>
        )}
          </Formik>
          </div>
          </>
      : <div>Something went wrong!</div>
    )
    
};

export default InviteForm