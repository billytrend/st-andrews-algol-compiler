!Treesort
structure number( int val ; pntr left,right )


procedure enter( pntr head,temp -> pntr )
if head = nil then temp else
if temp( val ) < head( val )
then { head( left ) := enter( head( left ),temp ) ; head }
else { head( right ) := enter( head( right ),temp ) ; head }

procedure print.tree( pntr head )
if head ~= nil do
begin
     print.tree( head( left ) )
     write head( val ),"'n"
     print.tree( head( right ) )
end

let head := nil ;
let value := readi;
while value ~= -1 do
begin
     head := enter( head,number( value,nil,nil ) )
     value := readi
end
write "The sorted numbers are:-'n"
print.tree( head )
?
