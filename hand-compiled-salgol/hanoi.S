!Towers of Hanoi
procedure move( cstring a,b )
write " ",a,"->",b,"'n"

procedure hanoi( cint n ; cstring a,b,c )
if n > 0 do
begin
     hanoi( n-1,a,c,b )
     move( a,b )
     hanoi( n-1,c,b,a )
end

hanoi( 6,"a","b","c" )
?
