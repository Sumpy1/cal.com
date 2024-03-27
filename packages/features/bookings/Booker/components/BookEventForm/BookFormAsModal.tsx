import type { ReactNode } from "react";

import dayjs from "@calcom/dayjs";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { Badge, Dialog, DialogContent, Icon } from "@calcom/ui";

import { useTimePreferences } from "../../../lib";
import { useBookerStore } from "../../store";
import { useEvent } from "../../utils/event";

const BookEventFormWrapper = ({ children }: { onCancel: () => void; children: ReactNode }) => {
  const { t } = useLocale();
  const selectedTimeslot = useBookerStore((state) => state.selectedTimeslot);
  const selectedDuration = useBookerStore((state) => state.selectedDuration);
  const { data } = useEvent();
  const parsedSelectedTimeslot = dayjs(selectedTimeslot);
  const { timeFormat, timezone } = useTimePreferences();
  if (!selectedTimeslot) {
    return null;
  }
  return (
    <>
      <h1 className="font-cal text-emphasis text-xl leading-5">{t("confirm_your_details")} </h1>
      <div className="my-4 flex space-x-2 rounded-md leading-none">
        <Badge
          variant="grayWithoutHover"
          startIcon={(props) => <Icon {...props} name="calendar" />}
          size="lg">
          <span>
            {parsedSelectedTimeslot.format("LL")} {parsedSelectedTimeslot.tz(timezone).format(timeFormat)}
          </span>
        </Badge>
        {(selectedDuration || data?.length) && (
          <Badge variant="grayWithoutHover" startIcon={(props) => <Icon {...props} name="clock" />} size="lg">
            <span>{selectedDuration || data?.length}</span>
          </Badge>
        )}
      </div>
      {children}
    </>
  );
};

export const BookFormAsModal = ({
  visible,
  onCancel,
  children,
}: {
  visible: boolean;
  onCancel: () => void;
  children: ReactNode;
}) => {
  return (
    <Dialog open={visible} onOpenChange={onCancel}>
      <DialogContent
        type={undefined}
        enableOverflow
        className="[&_.modalsticky]:border-t-subtle [&_.modalsticky]:bg-default max-h-[80vh] pb-0 [&_.modalsticky]:sticky [&_.modalsticky]:bottom-0 [&_.modalsticky]:left-0 [&_.modalsticky]:right-0 [&_.modalsticky]:-mx-8 [&_.modalsticky]:border-t [&_.modalsticky]:px-8 [&_.modalsticky]:py-4">
        <BookEventFormWrapper onCancel={onCancel}>{children}</BookEventFormWrapper>
      </DialogContent>
    </Dialog>
  );
};
