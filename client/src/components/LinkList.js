import Link from "./Link";
import { useQuery, gql } from "@apollo/client";

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        url
        description
      }
    }
  }
`;

const LinkList = () => {
  const { data } = useQuery(FEED_QUERY);
  return (
    <div>
      {data && (
        <>
          {data.feed?.links?.map((link) => {
            return <Link key={link.id} link={link} />;
          })}
        </>
      )}
    </div>
  );
};

export default LinkList;
