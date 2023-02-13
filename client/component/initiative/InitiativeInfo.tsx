import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import * as queries from '../../queries';
import Link from "next/link";

interface Media {
    id: number,
    url: string,
}

interface Organisation {
    id: number,
    name: string,
}
interface Initiative {
    id: number,
    name: string,
    description: string,
    media: Media[],
    organisation: Organisation,
}
interface InitiativesData {
    initiative: Initiative;
}

interface Props {
}

const InitiativeInfo = (props: Props):any => {

    const router = useRouter();
    const id:number = parseInt(router.query.id as string, 10);

    const initiative = useQuery<InitiativesData>(queries.INITIATIVE, {
        variables: {
        id:id
        }
    });

    console.log(initiative.data)

    if (initiative.loading) return <div>Loading initiative data</div>
    if (id && initiative.data) {
        return (
            <>
            <div className="m-2 p-2 flex flex-col justify-between relative">
                <div>
                    <h2 className=" text-primary">Initiatief</h2>
                    <h3 className=" text-2xl">{initiative.data.initiative.name}</h3>
                </div>
                <div className="absolute top-0 right-0">
                    <div className="flex flex-col -mr-2 -mt-2 gap-2 items-center border-b-8 border-l-8 border-b-secondary border-l-secondary">
                        <h4 className="text-gray pt-2">Een initiatief van</h4>
                        <div className="flex gap-2 bg-primary p-2 text-white">
                            <Link href={'/organisation/'+initiative.data.initiative.organisation.id} passHref>
                                <p>{initiative.data.initiative.organisation.name}</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className=" text-primary">Over dit initiatief:</h2>
                    <h3>{initiative.data.initiative.description}</h3>
                </div>
                <div className="mt-12">
                    <div className="bg-primary -ml-4 w-20 h-12 flex items-center justify-center border-t-secondary border-r-secondary border-b-secondary border-b-8 border-t-8 border-r-8">
                        <h2 className=" text-white">Media</h2>
                    </div>
                    <div className="bg-secondary w-full h-fit flex p-1 mt-4">
                        {
                            initiative.data.initiative.media.length > 0 ?
                            initiative.data.initiative.media.map((image) => {
                               return (
                                   <>
                                        <img className="w-1/5 h-fit" src={image.url} alt="Initiative media image" />
                                   </>
                               ) 
                            }) : 'no media yet'
                        }
                    </div>
                </div>
            </div>
            </>
        );
    } else if (initiative.error) {
        return (
            <div>Oops! Something went wrong! {initiative.error}</div>
        );
    }
    
}


export default InitiativeInfo