using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using TMKR.Models.DataModel;

namespace TMKR.DataAccess
{
    public class Prod_AdvtDao
    {

        private IDbConnection _con;

        public IDbConnection Conn
        {
            get
            {
                return _con = ConnectionFactory.CreateConnection();
            }
        }


        //Get Product Advertisements
        public List<Prod_AdvtModel> GetProd_Advts()
        {

            using (Conn)
            {
                string query = @"select 
	                                p.ID as Advt_Id, 
	                                pt.NME as Prod_Type, 
	                                p.DSCP as Advt_Dscp, 
                                    v.ID as VNDR_ID,
	                                v.FRST_NME as VNDR_Name,
	                                p.UNIT_PRICE as Unit_Price,
	                                p.MAX_ORDR_LIMT as Order_Limit,
	                                p.DLVRY_AVLB,
	                                i.Path as IMG_PATH
	                                from Prod_Advt p

                                    left join Product_Type pt on p.PROD_TYPE_ID = pt.ID
                                    left join Vendor v on p.VNDR_ID = v.ID
                                    left join Images i on p.ID = i.FId";

                return Conn.Query<Prod_AdvtModel>(query).ToList();
            }
        }

        public List<ActiveAdvtModel> GetProd_Advts(int vndrId)
        {

            using (Conn)
            {
                string query = @"select 
                    pt.NME,p.DSCP,p.UNIT_PRICE,p.MAX_ORDR_LIMT,p.DLVRY_AVLB,p.POST_DATE,p.STUS_NME 
                    from Prod_Advt p 
                    left join Product_Type pt on pt.ID = p.PROD_TYPE_ID  where VNDR_ID =" + vndrId;

                return Conn.Query<ActiveAdvtModel>(query).ToList();
            }
        }

        public bool Insert(ProdAdvertisementModel model)
        {

            using (Conn)
            {
                string query = @"INSERT INTO Prod_Advt 
                    (PROD_TYPE_ID,DSCP,VNDR_ID,UNIT_PRICE,MAX_ORDR_LIMT,DLVRY_AVLB,POST_DATE,STUS_NME) 
                    VALUES (@PROD_TYPE_ID,@DSCP,@VNDR_ID,@UNIT_PRICE,@MAX_ORDR_LIMT,@DLVRY_AVLB,@POST_DATE,@STUS_NME)";

                Conn.Execute(query, new { model.PROD_TYPE_ID, model.DSCP, model.VNDR_ID, model.UNIT_PRICE, model.MAX_ORDR_LIMT, model.DLVRY_AVLB, model.POST_DATE, model.STUS_NME });
                return true;
            }
        }
    }
}