#m8-fs21may-d2


Strive Blog Backend Authentication

Update your Strive Blog Backend project adding Basic Authentication

    Add Basic Authentication implementation
    Use BCrypt!
    Protect the routes to create, delete and update the blog posts. Only the owner can update and delete his own stuff
    Create a /me/stories route retrieving all the blog posts published by the authenticated user

Extra

    Modify the schema so that the articles can have more than one author
        the /me/stories endpoint is supposed to return the posts for both authors
        all authors should be able to create, delete, and update the blog post they share
    Add a role to the users, it can be either Admin or User
        Admins can moderate the content and therefore perform any CRUD operations on any User post