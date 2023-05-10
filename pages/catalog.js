import { useRouter } from "next/router";
import { useEffect,useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Banner from "@/components/banner-catalog/Banner";
import PresntationCompany from "@/components/presentation-catalog/PresentationCompany";

export default function Catalog (){
  const router = useRouter();
  const [company, setCompany] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCompany = async () => {
         const { data: companyData, error } = await supabase
              .from('companies')
              .select('*')
              .eq('id', router.query.id)
              .single();

         if (error) {
              console.error(error);
              return;
         }

         setCompany(companyData);

         const { data: catalogsData, error: catalogsError } = await supabase
              .from('catalogs')
              .select('*')
              .eq('company_id', companyData.id);

         if (catalogsError) {
              console.error(catalogsError);
              return;
         }

         setProducts(catalogsData);
    };
    
    fetchCompany();
  }, [router.query.id]);
  return (
    <>
    <Banner />
    <PresntationCompany company={company}/>
    </>
  );
};