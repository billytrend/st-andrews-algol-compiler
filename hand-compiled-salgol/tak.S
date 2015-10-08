let x = time

procedure tak( int x,y,z -> int )
if x <= y then z else
tak( tak( x - 1,y,z ),
     tak( y - 1,z,x ),
     tak( z - 1,x,y ) )

write tak( 18,12,6 ),"'n"

write "Time taken :- ",time - x,"'n"
