import { useRouter } from "next/router";
import { useEffect,useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Banner from "@/components/banner-catalog/Banner";

const Catalog = () => {
  const router = useRouter();
  const [company, setCompany] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCompany();
    fetchProducts();
  }
  ,[]);
  
  const fetchCompany = async () => {
    const { data } = await supabase
      .from("companies")
      .select("*")
      .eq("id", router.query.id)
      .single();
    setCompany(data);
  }

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("catalogs")
      .select("*")
      .eq("company_id", router.query.id);
    setProducts(data);
  } 

  return (
    <>
    <Banner />
    </>
  );
};