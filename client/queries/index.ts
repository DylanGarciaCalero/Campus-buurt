import { gql } from '@apollo/client';

/**
 *
 * These queries can be used without authentication
 */
export const CAMPUSES = gql`
  {
    campuses {
      id
      name
      address
      phone
      longitude
      latitude
      email
      website
      description
    }
  }
`;

export const CAMPUS_SELECTED = gql`
  query ($id: Int!) {
    campus(id: $id) {
      id
      name
      address
      phone
      longitude
      latitude
      email
      website
      description
    }
  }
`;

export const GET_CAMPUS = gql`
  query ($id: Int!) {
    campus(id: $id) {
      id
      name
      address
      phone
      longitude
      latitude
      email
      website
      description
    }
  }
`;

export const CAMPUS_DATA = gql`
  query ($id: Int!) {
    campus(id: $id) {
      id
      name
      address
      phone
      longitude
      latitude
      email
      website
      description
      initiatives {
        id
        name
        description
        organisation {
          id
          name
          logo
          longitude
          latitude
        }
      }
      educationalPrograms {
        id
        name
        credits
        programType
      }
    }
  }
`;

export const CAMPUS_MEDIA = gql`
  query {
    media {
      id
      url
    }
  }
`;

export const CAMPUSES_MAP = gql`
  {
    campuses {
      id
      name
      longitude
      latitude
      description
    }
  }
`;

export const ORGANISATIONS = gql`
  {
    organisations {
      id
      name
      description
      address
      email
      phone
      website
      longitude
      latitude
      logo
    }
  }
`;

export const ORGANISATION = gql`
  query ($id: Int!) {
    organisationById(id: $id) {
      id
      name
      description
      address
      email
      phone
      website
      logo
      longitude
      latitude
    }
  }
`;

export const GET_CATEGORY = gql`
  query ($id: Int!) {
    category(id: $id) {
      id
      name
      description
    }
  }
`;

export const GET_USER = gql`
  query ($id: Int!) {
    userById(id: $id) {
      id
      firstName
      lastName
      email
      role
      organisation {
        id
        name
        logo
      }
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query ($email: String!) {
    user(email: $email) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const USERS = gql`
  {
    users {
      id
      firstName
      lastName
      email
      role
      organisation {
        name
      }
    }
  }
`;

export const GET_PROGRAMS = gql`
  {
    educationalPrograms {
      id
      name
      description
      credits
      programType
      campus {
        id
        name
      }
    }
  }
`;

export const ADMINS = gql`
  {
    admins {
      id
      firstName
      lastName
      email
      role
      organisation {
        name
      }
    }
  }
`;

export const CATEGORIES = gql`
  {
    categories {
      id
      name
      description
    }
  }
`;

export const INITIATIVES = gql`
  {
    initiativesAccepted {
      id
      name
      description
      date
      category {
        id
        name
      }
      organisation {
        name
      }
      campuses {
        id
        name
      }
    }
  }
`;

export const CAMPUS_INITIATIVES = gql`
  query ($id: Int!) {
    campus(id: $id) {
      initiatives {
        id
        name
        description
      }
    }
  }
`;

export const INITIATIVE = gql`
  query ($id: Int!) {
    initiative(id: $id) {
      id
      name
      description
      date
      media {
        id
        url
      }
      organisation {
        id
        name
      }
    }
  }
`;

export const INVITATION_TYPE = gql`
  query ($type: String!) {
    invitationsByType(type: $type) {
      id
      name
      email
      type
      organisation {
        id
        name
      }
    }
  }
`;

export const COLLAB_INVITES = gql`
  {
    collabInvites {
      id
      initiative {
        id
        name
        description
        date
        organisation {
          name
        }
      }
      campus {
        id
        name
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($input: LoginUserInput!) {
    login(loginUserInput: $input) {
      access_token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation signup($input: CreateUserInput!) {
    signup(signupUserInput: $input) {
      id
    }
  }
`;

export const NEW_INVITATION = gql`
  mutation createInvitation($input: CreateInvitationInput!) {
    createInvitation(createInvitationInput: $input) {
      name
    }
  }
`;

export const CREATE_COLLAB = gql`
  mutation createCollabInvite($input: CreateCollabInviteInput!) {
    createCollabInvite(createCollabInviteInput: $input) {
      id
    }
  }
`

/**
 *
 * These queries require authentication
 */

export const GET_ORGANISATIONBYID = gql`
  query ($id: Int!) {
    organisationById(id:$id) {
      initiatives {
        id
        name
        date
        updatedAt
        createdAt
        accepted
      }
    }
  }
`

export const INVITATIONS = gql`
  query {
    invitations {
      id
      name
      organisation {
        id
        name
      }
    }
  }
`;

export const GET_PROGRAM_TYPE_BY_ID = gql`
  {
    programType(id: 1) {
      id
    }
  }
`;

export const UPDATE_CAMPUS = gql`
  mutation updateCampus($id: Int!, $input: UpdateCampusInput!) {
    updateCampus(id: $id, input: $input) {
      id
      name
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(updateUserInput: $input) {
      id
      organisationId
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: Int!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      id
    }
  }
`;

export const NEW_CATEGORY = gql`
  mutation createCategory($input: CreateCategoryInput!) {
    createCategory(createCategoryInput: $input) {
      id
      name
    }
  }
`;

export const UPDATE_INITIATIVE = gql`
  mutation updateInitiative($input: UpdateInitiativeInput!) {
    updateInitiative(updateInitiativeInput: $input) {
      id
      name
    }
  }
`;

export const CREATE_INITIATIVE = gql`
  mutation createInitiative($input: CreateInitiativeInput!) {
    createInitiative(createInitiativeInput: $input) {
      id
    }
  }
`;

export const UPDATE_ORGANISATION = gql`
  mutation updateOrganisation($id: Int!, $input: UpdateOrganisationInput!) {
    updateOrganisation(id: $id, updateOrganisationInput: $input) {
      name
    }
  }
`;

export const CREATE_ORGANISATION = gql`
  mutation createOrganisation($input: CreateOrganisationInput!) {
    createOrganisation(createOrganisationInput: $input) {
      id
      name
    }
  }
`;

export const DELETE_INVITATION = gql`
  mutation deleteInvitation($id: Int!) {
    deleteInvitation(id: $id) {
      name
    }
  }
`;

export const DELETE_COLLAB_INVITE = gql`
  mutation deleteCollabInvite($id: Int!) {
    deleteCollabInvite(id: $id) {
      initiative {
        name
      }
    }
  }
`;

export const ACCEPT_COLLAB_INVITE = gql`
  mutation updateInitiative($input: UpdateInitiativeInput!) {
    updateInitiative(updateInitiativeInput: $input) {
      id
      name
    }
  }
`;

export const ADD_INITIATIVE_TO_CAMPUS = gql`
  mutation addInitToCampus($campusId: Int!, $initId: Int!) {
    addInitiativeToCampus(campusId: $campusId, initiativeId: $initId) {
      id
    }
  }
`;

export const ADD_NEW_CAMPUS = gql`
  mutation createCampus($input: CreateCampusInput!) {
    createCampus(createCampusInput: $input) {
      id
      name
    }
  }
`;

export const UPDATE_PROGRAM = gql`
  mutation updateProgram($input: UpdateEducationalProgramInput!) {
    updateProgram(updateEducationalProgramInput: $input) {
      id
      name
    }
  }
`;

export const ADD_NEW_PROGRAM = gql`
  mutation addNewProgram($input: CreateEducationalProgramInput!) {
    createEducationalProgram(createEducationalProgramInput: $input) {
      id
    }
  }
`;

export const DELETE_CAMPUS = gql`
  mutation deleteCampus($id: Int!) {
    deleteCampus(id: $id) {
      name
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: Int!) {
    deleteCategory(id: $id) {
      name
    }
  }
`;

export const DELETE_PROGRAM = gql`
  mutation deleteProgram($id: Int!) {
    deleteProgram(id: $id) {
      name
    }
  }
`;

export const DELETE_ORGANISATION = gql`
  mutation deleteOrganisation($id: Int!) {
    deleteOrganisation(id: $id) {
      name
    }
  }
`;

export const DELETE_INITIATIVE = gql`
  mutation deleteInitiative($id: Int!) {
    deleteInitiatve(id: $id) {
      name
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id) {
      firstName
    }
  }
`;
