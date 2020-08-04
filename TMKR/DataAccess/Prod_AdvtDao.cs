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


        //Get Product Advertisements***
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
	                                i.Path as IMG_PATH,
                                    pt.Unit,
                                    p.STUS_NME
	                                from Prod_Advt p

                                    left join Product_Type pt on p.PROD_TYPE_ID = pt.ID
                                    left join Vendor v on p.VNDR_ID = v.ID
                                    left join Images i on p.ID = i.FId
                                    where p.STUS_NME = 'Visible' AND p.IsDeleted = 0 AND p.IsActive = 'True' AND Type = 'Advertisement' ";

                return Conn.Query<Prod_AdvtModel>(query).ToList();
            }
        }


        //Get Product Advertisements for Admin
        public List<Prod_AdvtModel> GetAllProd_Advts()
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
	                                i.Path as IMG_PATH,
                                    pt.Unit,
                                    p.STUS_NME,
                                    p.IsDeleted,
                                    p.IsActive
	                                from Prod_Advt p

                                    left join Product_Type pt on p.PROD_TYPE_ID = pt.ID
                                    left join Vendor v on p.VNDR_ID = v.ID
                                    left join Images i on p.ID = i.FId
									where i.Type = 'Advertisement'";

                return Conn.Query<Prod_AdvtModel>(query).ToList();
            }
        }

        public void unblockAdvt(int advtId)
        {
            using (Conn)
            {
                string query = @"UPDATE Prod_Advt SET IsACtive = 1 WHERE ID = @ID";

                Conn.Execute(query, new { ID = advtId });
            }
        }

        public void blockAdvt(int advtId)
        {
            using (Conn)
            {
                string query = @"UPDATE Prod_Advt SET IsACtive = 0 WHERE ID = @ID";

                Conn.Execute(query, new { ID = advtId });
            }
        }

        public void addImagePath(ProdAdvertisementModel advtVM)
        {
            using (Conn)
            {
                string query = @"INSERT INTO Images 
                    (Path,FId,Type,IsActive) 
                    VALUES (@Path,@FId,@Type,1)";

                Conn.Execute(query, new { advtVM.Path, FId = advtVM.ID, Type = "Advertisement" });
            }
        }

        public void updateAdvt(ActiveAdvtModel advtVM)
        {
            using (Conn)
            {
                string query = @"UPDATE Prod_Advt
                                SET 
                                    PROD_TYPE_ID = @PROD_TYPE_ID
                                   ,DSCP = @DSCP
                                   ,UNIT_PRICE = @UNIT_PRICE
                                   ,MAX_ORDR_LIMT = @MAX_ORDR_LIMT
                                   ,DLVRY_AVLB = @DLVRY_AVLB
                                   ,STUS_NME = @STUS_NME
                                    WHERE ID = @ID AND IsDeleted = 0 AND IsActive = 'True' ";


                Conn.Execute(query, new { PROD_TYPE_ID = advtVM.PROD_TYPE_ID, DSCP = advtVM.DSCP, UNIT_PRICE = advtVM.UNIT_PRICE, MAX_ORDR_LIMT = advtVM.MAX_ORDR_LIMT, DLVRY_AVLB = advtVM.DLVRY_AVLB, STUS_NME = advtVM.STUS_NME, ID = advtVM.ID });
            }
        }

        public  void DeleteAdvt(int advtId)
        {
            using (Conn)
            {
                string query = @"UPDATE Prod_Advt
                                SET 
                                   IsDeleted = @IsDeleted
                                    WHERE ID = @ID";


                Conn.Execute(query, new { IsDeleted = true, ID = advtId });
            }
        }

        public ActiveAdvtModel GetProd_Advt(int advtId)
        {
            using (Conn)
            {
                string query = @"select 
                    p.ID,p.PROD_TYPE_ID,pt.NME,p.DSCP,p.UNIT_PRICE,p.MAX_ORDR_LIMT,p.DLVRY_AVLB,p.POST_DATE,p.STUS_NME 
                    from Prod_Advt p 
                    left join Product_Type pt on pt.ID = p.PROD_TYPE_ID  where p.ID =" + advtId + "AND IsDeleted = 0 AND p.IsActive = 'True' ";

                return Conn.QueryFirstOrDefault<ActiveAdvtModel>(query);
            }
        }

        public List<ActiveAdvtModel> GetProd_Advts(int vndrId)
        {

            using (Conn)
            {

                string query = @"select 
                    p.ID,pt.NME,p.DSCP,p.UNIT_PRICE,p.MAX_ORDR_LIMT,p.DLVRY_AVLB,p.POST_DATE,p.STUS_NME,pt.Unit
                    from Prod_Advt p 
                    left join Product_Type pt on pt.ID = p.PROD_TYPE_ID  where VNDR_ID =" + vndrId + "AND IsDeleted = 0 AND p.IsActive = 'True' ";

                

                List<ActiveAdvtModel> a = Conn.Query<ActiveAdvtModel>(query).ToList();

                return a;
            }
        }

        public int Insert(ProdAdvertisementModel model)
        {

            using (Conn)
            {
                string query = @"INSERT INTO Prod_Advt 
                    (PROD_TYPE_ID,DSCP,VNDR_ID,UNIT_PRICE,MAX_ORDR_LIMT,DLVRY_AVLB,POST_DATE,STUS_NME,IsDeleted,IsActive) 
                    VALUES (@PROD_TYPE_ID,@DSCP,@VNDR_ID,@UNIT_PRICE,@MAX_ORDR_LIMT,@DLVRY_AVLB,@POST_DATE,@STUS_NME,0,1) SELECT CAST(SCOPE_IDENTITY() as int)";

                var id = Conn.Query<int>(query, new { model.PROD_TYPE_ID, model.DSCP, model.VNDR_ID, model.UNIT_PRICE, model.MAX_ORDR_LIMT, model.DLVRY_AVLB, model.POST_DATE, model.STUS_NME }).Single();
                return id;
            }
        }

        //***
        public Prod_AdvtModel GetProdAdvt(int advtId)
        {
            using (Conn)
            {
                string query = @"select 
	                                pa.ID as Advt_Id,
	                                pt.NME as Prod_Type,
	                                pa.DSCP as Advt_Dscp,
	                                pa.VNDR_ID,
	                                v.FRST_NME as VNDR_Name,
	                                pa.UNIT_PRICE as Unit_Price,
	                                pa.MAX_ORDR_LIMT as Order_Limit,
	                                pa.DLVRY_AVLB,
	                                i.Path as IMG_PATH,
                                    pt.Unit

	                                from Prod_Advt pa
	                                left join Product_Type pt on pt.ID = pa.PROD_TYPE_ID
	                                left join Vendor v on v.ID = pa.VNDR_ID
	                                left join Images i on i.FId = pa.ID and i.Type = 'Advertisement'
	                                where pa.ID = "+ advtId + "AND pa.IsDeleted = 0 AND pa.IsActive = 'True' ";

                return Conn.QueryFirstOrDefault<Prod_AdvtModel>(query);
            }
        }
    }
}