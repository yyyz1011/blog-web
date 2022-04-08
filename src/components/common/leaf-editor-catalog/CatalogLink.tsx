import { Anchor } from "@douyinfe/semi-ui";
import React, { ReactElement } from "react";

const { Link } = Anchor;

interface CatalogLinkProps {
  tocItem: any;
}

const CatalogLink = ({ tocItem }: CatalogLinkProps): ReactElement => {
  return (
    <Link href={`#${tocItem.text}`} title={tocItem.text}>
      {tocItem.children && 
        <div className="catalog-container">
          {tocItem.children.map((item: any) => 
            <CatalogLink key={`${item.level}-${item.text}`} tocItem={item} />
          )}
        </div>
      }
    </Link>
  );
};

export default CatalogLink;
