using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Taskopia.Migrations
{
    /// <inheritdoc />
    public partial class addRolesFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4ffb194f-432e-46ad-b26d-06d16402a70e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8c04db31-1d59-4eb3-9f92-58064af832d6");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "da5f2f95-7c4c-47a9-8b8f-b0418cbd98ec", "b46db030-04ee-425a-b0e3-49489d7bb4d1", "Admin", "ADMIN" },
                    { "ef5cd7f1-dbab-4207-9b63-29be48b1c938", "14eb04c8-3228-45f5-a5de-fe39f1b4de33", "Customer", "CUSTOMER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "da5f2f95-7c4c-47a9-8b8f-b0418cbd98ec");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ef5cd7f1-dbab-4207-9b63-29be48b1c938");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4ffb194f-432e-46ad-b26d-06d16402a70e", "3ec9a117-9b33-4f35-b2ee-6a92c8a7e51a", "Customer", "Customer" },
                    { "8c04db31-1d59-4eb3-9f92-58064af832d6", "8499254f-6c07-43a7-aa97-6f8cea9c7b64", "Admin", "Admin" }
                });
        }
    }
}
